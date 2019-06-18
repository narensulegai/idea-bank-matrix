import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

class EditableText extends Component {

  state = {editMode: false};

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
            <div onClick={this.focusInput} className="editable-text">
              <div className="row">
                <Typography variant="h5">
                  &nbsp;&nbsp;{this.props.value}
                </Typography>
              </div>
            </div>
            <DeleteIcon color="secondary" onClick={this.handleDelete}/>
          </div>}
      </Fragment>
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
