import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";

class Ideas extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleIdeaChange = (index, value) => {
    const ideas = this.props.ideas.slice(0);
    ideas[index].text = value;
    this.props.onChange(ideas);
  };

  handleAddNewIdea = () => {
    const id = Date.now() + parseInt(Math.random());
    const ideas = this.props.ideas.slice(0);
    ideas.push({id, text: this.refs.newIdea.value, quadrant: null});
    this.refs.newIdea.value = '';
    this.props.onChange(ideas);
  };

  handleOnIdeaDrag = (i) => {
    return this.props.ideas[i];
  };

  render() {
    return (
      <div>
        <div>
          {this.props.ideas.map((idea, i) => {
            return <div key={i}>
              <EditableText draggable={true}
                            data={idea}
                            onDrag={() => {
                              this.handleOnIdeaDrag(i)
                            }}
                            onChange={(e) => {
                              this.handleIdeaChange(i, e)
                            }}
                            value={idea.text}
              />
              <span>{idea.quadrant}</span>
            </div>
          })}
        </div>
        <div>
          <input type="text" ref="newIdea"/>
          <button onClick={this.handleAddNewIdea}>
            Add Idea
          </button>
        </div>
      </div>

    );
  }
}

Ideas.propTypes = {
  ideas: PropTypes.array,
  onChange: PropTypes.func
};

export default Ideas;