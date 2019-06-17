import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Ideas from './components/Ideas';
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

const useStyles = makeStyles(theme => ({}));

const functionHierarchy = [];

class App extends Component {
  state = {
    functionHierarchy
  };

  constructor(props) {
    super(props);

  }

  handleFunctionHierarchyChange = (functionHierarchy) => {
    this.setState({functionHierarchy});
  };

  render() {

    return (
      <div>
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
              <CostImpactGrid/>
            </Grid>
          </Grid>
        </Container>

      </div>
    );
  }
}

App.propTypes = {};

export default App;
