import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class CostImpactGrid extends Component {

  state = {
    gridType: 1
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  setGridType(gridType) {
    this.setState({gridType})
  }

  render() {
    return (
      <Fragment>
        <div>
          Cost Impact Grid
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
          <div className="quadrant"></div>
          <div className="quadrant"></div>
          <div className="quadrant"></div>
          <div className="quadrant"></div>
        </div>
      </Fragment>

    );
  }
}

CostImpactGrid.propTypes = {};

export default CostImpactGrid;