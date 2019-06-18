import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Done from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import {PaddedFab} from '../Styled';
import Fab from "@material-ui/core/Fab";

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

  handleDragStart = (ev) => {
    const data = this.props.data;
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
              inputRef={(input) => {
                this.input = input;
              }}
              required
              label="Function name"
              defaultValue={this.props.value}
              margin="none"
              onBlur={this.handleSave}
            />

            <Fab size="small" color="primary" onClick={this.handleSave}>
              <Done/>
            </Fab>
          </div>
          : <div className="row">
            <div draggable={this.props.draggable} onClick={this.focusInput} className="editable-text"
                 onDragStart={this.handleDragStart}>
              {this.props.value}
            </div>
            <Fab size="small" color="secondary" onClick={this.handleDelete}>
              <DeleteIcon/>
            </Fab></div>}
      </Fragment>
    );
  }
}

EditableText.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  draggable: PropTypes.bool,
  data: PropTypes.any
};

EditableText.defaultProps = {
  draggable: false
};

export default EditableText;
