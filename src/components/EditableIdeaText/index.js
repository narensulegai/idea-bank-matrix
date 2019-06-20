import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import SvgIcon from 'material-ui/SvgIcon';

const DragIndicatorIcon = (props) => (
  <SvgIcon {...props}>
    <path
      d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </SvgIcon>
);


class EditableIdeaText extends Component {

  state = {editMode: false};
  quadrantText = ['Q12', 'Q22', 'Q11', 'Q21'];

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleSave = async () => {
    const inp = this.refs.ideaText.input.refs.input.value;
    await this.toggleEdit();
    this.props.onChange(inp);
  };

  handleDelete = () => {
    this.props.onDelete();
  };

  handleDragStart = (ev) => {
    const data = this.props.idea;
    ev.dataTransfer.setData("data", JSON.stringify(data));
  };

  focusInput = async () => {
    await this.toggleEdit();
    this.refs.ideaText.input.refs.input.focus();
  };

  toggleEdit = async () => {
    return await this.setState({editMode: !this.state.editMode});
  };

  render() {
    return (
      <div>
        {this.state.editMode

          ? <div className="row">
            <TextField
              fullWidth={true}
              ref="ideaText"
              multiLine={true}
              hintText={this.props.label}
              defaultValue={this.props.value}
            />
            <DoneIcon color="primary" onClick={this.handleSave}/>
          </div>

          : <div className="row small-margin-top">
            <div draggable={true} onClick={this.focusInput} className="editable-text"
                 onDragStart={this.handleDragStart}>
              <div className="row">
                <DragIndicatorIcon/>
                <div className="idea-text">{this.props.value}</div>
              </div>
            </div>
            <div className="row">
              {this.props.idea.quadrant === null
                ? null
                : <div className='quadrant-indicator'>
                  {this.quadrantText[this.props.idea.quadrant]}
                </div>}
              <DeleteIcon color="secondary" onClick={this.handleDelete}/>
            </div>
          </div>}
      </div>
    );
  }
}

EditableIdeaText.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  idea: PropTypes.any,
  label: PropTypes.string
};

EditableIdeaText.defaultProps = {};

export default EditableIdeaText;
