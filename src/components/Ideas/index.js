import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";
import TextField from '@material-ui/core/TextField';
import * as _ from 'lodash';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

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
    ideas.push({id, text: this.newIdea.value, quadrant: null});
    this.newIdea.value = '';
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
              <EditableText draggable={true}
                            label="Idea text"
                            data={idea}
                            onDrag={() => {
                              this.handleOnIdeaDrag(i)
                            }}
                            onChange={(e) => {
                              this.handleIdeaChange(i, e)
                            }}
                            onDelete={() => {
                              this.handleDeleteIdea(i)
                            }}
                            value={idea.text}
              />
              <div>{idea.quadrant}</div>
            </div>
          })}
        </Fragment>

        <div className="row">
          <TextField
            fullWidth={true}
            placeholder="Idea for function"
            inputRef={(input) => {
              this.newIdea = input;
            }}
            multiline
            label="Idea text"
            margin="none"/>

          <Fab size="small" color="primary" onClick={this.handleAddNewIdea}>
            <AddIcon/>
          </Fab>
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