import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import * as _ from 'lodash';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditableIdeaText from "../EditableIdeaText";

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
    ideas.push({id, text: this.refs.newIdea.input.refs.input.value, quadrant: null, position: null});
    this.refs.newIdea.input.refs.input.value = ''; //check this
    this.props.onChange(ideas);
  };

  handleDeleteIdea = (i) => {
    const ideas = _.cloneDeep(this.props.ideas);
    ideas.splice(i, 1);
    this.props.onChange(ideas);
  };

  handleOnIdeaDrag = (i) => {
    return this.props.ideas[i];
  };

  render() {
    return (
      <Fragment>
        <Fragment>
          {this.props.ideas.map((idea, i) => {
            return <div key={i}>
              <EditableIdeaText label="Idea text"
                                idea={idea}
                                onDrag={() => {
                                  this.handleOnIdeaDrag(i)
                                }}
                                onChange={(e) => {
                                  this.handleIdeaChange(i, e)
                                }}
                                onDelete={() => {
                                  this.handleDeleteIdea(i)
                                }}
                                value={idea.text}/>
            </div>
          })}
        </Fragment>

        <div className="row">
          <TextField
            fullWidth={true}
            hintText="Idea for function"
            ref="newIdea"
            multiLine={true}
            floatingLabelText="Idea text"/>
          <ContentAdd onClick={this.handleAddNewIdea} primary="true"/>
        </div>
      </Fragment>

    );
  }
}

Ideas.propTypes = {
  ideas: PropTypes.array,
  onChange: PropTypes.func
};

export default Ideas;