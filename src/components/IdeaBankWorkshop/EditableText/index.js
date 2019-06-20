import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class EditableText extends Component {

  state = {editMode: false};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleSave = async () => {
    const inp = this.refs.inputText.input.value;
    await this.toggleEdit();
    this.props.onChange(inp);
  };

  handleDelete = () => {
    this.props.onDelete();
  };

  focusInput = async () => {
    await this.toggleEdit();
    this.refs.inputText.input.focus();
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
              ref="inputText"
              hintText={this.props.label}
              defaultValue={this.props.value}
            />

            <DoneIcon color="primary" onClick={this.handleSave}/>
          </div>

          : <div className="row">
            <div onClick={this.focusInput} className="editable-text">
              <div className="row">
                <h4>{this.props.value}</h4>
              </div>
            </div>
            <DeleteIcon color="secondary" onClick={this.handleDelete}/>
          </div>}
      </div>
    );
  }
}

EditableText.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
};

EditableText.defaultProps = {
  draggable: false
};

export default EditableText;
