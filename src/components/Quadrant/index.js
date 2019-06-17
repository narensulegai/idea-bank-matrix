import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class Quadrant extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleOnDrop = (ev) => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData("data"));
    this.props.onIdeaDrop(data);
  };

  handleOnDragOver = (ev) => {
    ev.preventDefault();
  };

  handleDragStart = (ev, data) => {
    ev.dataTransfer.setData("data", JSON.stringify(data));
  };

  render() {
    return (
      <div className="quadrant" onDrop={this.handleOnDrop} onDragOver={this.handleOnDragOver}>
        {this.props.ideas.map((idea, i) => {
          return <div key={i} draggable={true} onDragStart={(ev) => {
            this.handleDragStart(ev, idea)
          }}>{idea.text}</div>
        })}
      </div>
    );
  }
}

Quadrant.propTypes = {
  onIdeaDrop: PropTypes.func,
  ideas: PropTypes.array
};

export default Quadrant;