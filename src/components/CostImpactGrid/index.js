import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Quadrant from "../Quadrant";

class CostImpactGrid extends Component {

  state = {
    gridType: 1,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  setGridType(gridType) {
    this.setState({gridType})
  }

  handleIdeaDrop = (quadrant, idea) => {
    this.props.onChange(quadrant, idea);
  };

  render() {
    return (
      <Fragment>
        <div>
          Cost vs Impact Grid
        </div>
        <div>
          <button style={{backgroundColor: this.state.gridType === 1 ? 'grey' : null}}
                  onClick={this.setGridType.bind(this, 1)}>
            2 X 2
          </button>
          <button style={{backgroundColor: this.state.gridType === 2 ? 'grey' : null}}
                  onClick={this.setGridType.bind(this, 2)}>
            3 X 3
          </button>
        </div>
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