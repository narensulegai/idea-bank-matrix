import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import FunctionName from './components/FunctionName';
import 'typeface-roboto';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import CostImpactGrid from "./components/CostImpactGrid";
import _ from 'lodash';

const useStyles = makeStyles(theme => ({}));

class App extends Component {
  state = {
    functionHierarchy: [],
    ideaQuadrant: {},
    ideasByQuadrants: [[], [], [], [], []]
  };

  constructor(props) {
    super(props);
  }

  handleFunctionHierarchyChange = (functionHierarchy) => {
    this.setState({functionHierarchy});
  };

  extractAllIdeas = (fh) => {
    return fh.reduce((fhm, f) => {
      return [...fhm, ...f.ideas, ...this.extractAllIdeas(f.children)];
    }, []);
  };

  handleIdeaQuadrantChange = async (quadrant, idea) => {
    await this.updateQuadrantInFunctionHierarchy(quadrant, idea);
    const allIdeas = this.extractAllIdeas(this.state.functionHierarchy);
    return await this.updateIdeaQuadrant(allIdeas);
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
          <Grid container spacing={3}>
            <Grid item md={6}>
              <FunctionName functionHierarchy={this.state.functionHierarchy}
                            onChange={this.handleFunctionHierarchyChange}/>
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
