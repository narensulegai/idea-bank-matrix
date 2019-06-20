import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Quadrant from "../Quadrant";
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';

const GridType0 = (props) => {
  return <div className="grid">
    {/*Sub labels*/}
    <div className="q0-label">
      <input className="quadrant-label-input" type="text" defaultValue="High"/>
    </div>
    <div className="q2-label-left">
      <input className="quadrant-label-input" type="text" defaultValue="Low"/>
    </div>
    <div className="q2-label-bottom">
      <input className="quadrant-label-input" type="text" defaultValue="High"/>
    </div>
    <div className="q3-label">
      <input className="quadrant-label-input" type="text" defaultValue="Low"/>
    </div>

    {/*Main axis labels*/}
    <div className="x-axis-label">
      <input className="quadrant-label-input" type="text" defaultValue="Impact"/>
    </div>
    <div className="y-axis-label">
      <input className="quadrant-label-input" type="text" defaultValue="Cost"/>
    </div>


    {[0, 1, 2, 3].map((quadrantIndex, i) => {
      return <Quadrant key={i}
                       onIdeaDrop={(idea) => {
                         props.onDrop(quadrantIndex, idea)
                       }}
                       ideas={props.ideasByQuadrants[quadrantIndex]}/>
    })}

  </div>
};

const GridType1 = (props) => {
  return GridType0(props);
};

class CostImpactGrid extends Component {

  state = {
    gridType: 0,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  setGridType = (gridType) => {
    this.setState({gridType})
  };

  handleIdeaDrop = (quadrant, idea) => {
    this.props.onChange(quadrant, idea);
  };

  render() {
    return (
      <div>
        <h2 className="center">Assessment Grid</h2>

        <div className="center">

          <FlatButton label="2 X 2"
                      onClick={() => {
                        this.setGridType(0)
                      }}
                      primary={this.state.gridType === 0}/>

          <FlatButton label="3 X 3"
                      onClick={() => {
                        this.setGridType(1)
                      }}
                      primary={this.state.gridType === 1}/>
        </div>

        {this.state.gridType === 0
          ? <GridType0 onDrop={this.handleIdeaDrop} ideasByQuadrants={this.props.ideasByQuadrants}/>
          : null}
        {this.state.gridType === 1
          ? <GridType1 onDrop={this.handleIdeaDrop} ideasByQuadrants={this.props.ideasByQuadrants}/>
          : null}
      </div>

    );
  }
}

CostImpactGrid.propTypes = {
  ideaQuadrant: PropTypes.object,
  onChange: PropTypes.func
};

export default CostImpactGrid;