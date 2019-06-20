import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import FunctionName from './components/FunctionName';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
  handleIdeaQuadrantChange = async (quadrant, position, idea) => {
    await this.updateQuadrantInFunctionHierarchy(quadrant, position, idea);
    return await this.refreshIdeaQuadrant();
  };

  updateIdeaQuadrant = async (allIdeas) => {
    const ideasByQuadrants = allIdeas.reduce((m, idea) => {
      if (idea.quadrant !== null) m[idea.quadrant].push(idea);
      return m;
    }, [[], [], [], []]);
    return await this.setState({ideasByQuadrants});
  };

  updateQuadrantInFunctionHierarchy = async (quadrant, position, idea) => {
    const updateInIdeaList = (ideas) => { //TODO : break when changed
      ideas.forEach(i => {
        if (i.id === idea.id) {
          i.quadrant = quadrant;
          i.position = position;
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
      <MuiThemeProvider>
        <div className="ideabank-workshop">
          <AppBar title="IdeaBank Workshop" iconElementLeft={<div/>}/>
          <div className='main-layout'>
            <div className="function-name-container">
              <h2>Function Ideas</h2>
              <FunctionName functionHierarchy={this.state.functionHierarchy}
                            onChange={this.handleFunctionHierarchyChange}/>
              {this.state.functionHierarchy.length === 0
                ? <div className="center">Please add a function name to start.</div>
                : null}
            </div>
            <div className="cost-impact-grid-container">
              <CostImpactGrid ideasByQuadrants={this.state.ideasByQuadrants}
                              onChange={this.handleIdeaQuadrantChange}/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;
