import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Quadrant from "../Quadrant";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class CostImpactGrid extends Component {

  state = {
    gridType: 0,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  setGridType = (ev, gridType) => {
    this.setState({gridType})
  };

  handleIdeaDrop = (quadrant, idea) => {
    this.props.onChange(quadrant, idea);
  };

  render() {
    return (
      <Fragment>
        <div className="small-margin-top"/>
        <Typography align="center" variant="h5">Cost vs Impact Grid</Typography>
        <Tabs value={this.state.gridType} onChange={this.setGridType}
              indicatorColor="primary"
              textColor="primary"
              centered>
          <Tab label="2 X 2"/>
          <Tab label="3 X 3"/>
        </Tabs>
        <div className="grid">
          <Quadrant onIdeaDrop={this.handleIdeaDrop.bind(this, 0)} ideas={this.props.ideasByQuadrants[0]}/>
          <Quadrant onIdeaDrop={this.handleIdeaDrop.bind(this, 1)} ideas={this.props.ideasByQuadrants[1]}/>
          <Quadrant onIdeaDrop={this.handleIdeaDrop.bind(this, 2)} ideas={this.props.ideasByQuadrants[2]}/>
          <Quadrant onIdeaDrop={this.handleIdeaDrop.bind(this, 3)} ideas={this.props.ideasByQuadrants[3]}/>
        </div>
      </Fragment>

    );
  }
}

CostImpactGrid.propTypes = {
  ideaQuadrant: PropTypes.object,
  onChange: PropTypes.func
};

export default CostImpactGrid;