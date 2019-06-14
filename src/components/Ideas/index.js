import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Ideas extends Component {
  state = {ideas: ['idea1', 'idea2'], newIdea: ''};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleIdeaChange = (index, e) => {
    const ideas = this.state.ideas.slice(0);
    ideas[index] = e.target.value;
    this.setState({ideas});
  };

  handleAddNewIdea = () => {
    const ideas = this.state.ideas.slice(0);
    ideas.push(this.refs.newIdea.value);
    this.setState({ideas});
  };

  render() {
    return (
      <div>
        <div>
          {this.state.ideas.map((idea, i) => {
            return <div key={i}>
              <input type="text"
                     onChange={(e) => {
                       this.handleIdeaChange(i, e)
                     }}
                     value={idea}/>
            </div>
          })}
        </div>
        <div>
          <input type="text" ref="newIdea"/>
          <button onClick={this.handleAddNewIdea}>
            Add Ideas
          </button>
        </div>
      </div>

    );
  }
}

Ideas.propTypes = {};

export default Ideas;