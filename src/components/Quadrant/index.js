import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Quadrant extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleOnDrop = (ev) => {
    ev.preventDefault();
    const targetRect = ev.target.getBoundingClientRect();
    const top = ev.clientY - targetRect.top;
    const left = ev.clientX - targetRect.left;
    const data = JSON.parse(ev.dataTransfer.getData("data"));
    this.props.onIdeaDrop(data, {top, left});
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
          return <div className="quadrant-idea"
                      key={i}
                      draggable={true}
                      onDragStart={(ev) => {
                        this.handleDragStart(ev, idea)
                      }}
                      style={{top: idea.position.top, left: idea.position.left}}>
            {idea.text.slice(0, 4)}...
          </div>
        })}
        {this.props.labels}
      </div>
    );
  }
}

Quadrant.propTypes = {
  onIdeaDrop: PropTypes.func,
  ideas: PropTypes.array
};

export default Quadrant;