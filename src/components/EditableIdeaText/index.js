import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Typography from '@material-ui/core/Typography';

class EditableIdeaText extends Component {

  state = {editMode: false};
  quadrantText = ['Q12', 'Q22', 'Q11', 'Q21'];

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleSave = async () => {
    const inp = this.input.value;
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
    this.input.focus();
  };

  toggleEdit = async () => {
    return await this.setState({editMode: !this.state.editMode});
  };

  render() {
    return (
      <Fragment>
        {this.state.editMode

          ? <div className="row">
            <TextField
              fullWidth={true}
              inputRef={(input) => {
                this.input = input;
              }}
              placeholder={this.props.label}
              defaultValue={this.props.value}
              margin="none"
              onBlur={this.handleSave}
            />
            <DoneIcon color="primary" onClick={this.handleSave}/>
          </div>

          : <div className="row">
            <div draggable={true} onClick={this.focusInput} className="editable-text"
                 onDragStart={this.handleDragStart}>
              <div className="row">
                <DragIndicatorIcon color="primary"/>
                <Typography variant="subtitle1">
                  {this.props.value}
                </Typography>
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
      </Fragment>
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
