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

  render() {
    return (
      <div className="quadrant" onDrop={this.handleOnDrop} onDragOver={this.handleOnDragOver}>
        {this.props.ideas.map((idea, i) => {
          return <div key={i}>{idea.text}</div>
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