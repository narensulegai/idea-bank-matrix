import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import FunctionName from './components/FunctionName';
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CostImpactGrid from "./components/CostImpactGrid";
import _ from 'lodash';

class App extends Component {
  state = {
    functionHierarchy: [],
    ideaQuadrant: {},
    ideasByQuadrants: [[], [], [], [], []]
  };

  constructor(props) {
    super(props);
  }

  handleFunctionHierarchyChange = async (functionHierarchy) => {
    await this.setState({functionHierarchy});
    return await this.refreshIdeaQuadrant();
  };

  extractAllIdeas = (fh) => {
    return fh.reduce((fhm, f) => {
      return [...fhm, ...f.ideas, ...this.extractAllIdeas(f.children)];
    }, []);
  };
  refreshIdeaQuadrant = async () => {
    const allIdeas = this.extractAllIdeas(this.state.functionHierarchy);
    return await this.updateIdeaQuadrant(allIdeas);
  };
  handleIdeaQuadrantChange = async (quadrant, idea) => {
    await this.updateQuadrantInFunctionHierarchy(quadrant, idea);
    return await this.refreshIdeaQuadrant();
  };

  updateIdeaQuadrant = async (allIdeas) => {
    const ideasByQuadrants = allIdeas.reduce((m, idea) => {
      if (idea.quadrant !== null) m[idea.quadrant].push(idea);
      return m;
    }, [[], [], [], []]);
    return await this.setState({ideasByQuadrants});
  };

  updateQuadrantInFunctionHierarchy = async (quadrant, idea) => {
    const updateInIdeaList = (ideas) => { //TODO : break when changed
      ideas.forEach(i => {
        if (i.id === idea.id) {
          i.quadrant = quadrant;
        }
      });
    };
    const updateRecursively = (fh) => {
      updateInIdeaList(fh.ideas);
      fh.children.forEach(updateRecursively);
    };
    const functionHierarchy = _.cloneDeep(this.state.functionHierarchy);
    functionHierarchy.forEach(updateRecursively);
    return await this.setState({functionHierarchy});
  };

  render() {

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5">
              IdeaBank Workshop
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div className="small-margin-top"/>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Typography align="center" variant="h5">Function Ideas</Typography>
              <FunctionName functionHierarchy={this.state.functionHierarchy}
                            onChange={this.handleFunctionHierarchyChange}/>
              {this.state.functionHierarchy.length === 0
                ? <Typography align="center" variant="subtitle1">Please add a function name to start.</Typography>
                : null}
            </Grid>
            <Grid item md={6}>
              <CostImpactGrid ideasByQuadrants={this.state.ideasByQuadrants}
                              onChange={this.handleIdeaQuadrantChange}/>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

App.propTypes = {};

export default App;
