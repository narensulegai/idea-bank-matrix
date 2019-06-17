import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

class EditableText extends Component {

  state = {editMode: true};

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  handleSave = () => {
    const inp = this.refs.inputRef.value;
    this.setState({editMode: false});
    this.props.onChange(inp);
  };

  handleDelete = () => {
    this.props.onDelete();
  };

  handleDragStart = (ev) => {
    const data = this.props.data;
    console.log(data);
    ev.dataTransfer.setData("data", JSON.stringify(data));
  };

  render() {
    return (
      <Fragment>
        {this.state.editMode
          ? <Fragment>
            <input type="text" ref="inputRef" defaultValue={this.props.value}/>
            <button onClick={this.handleSave}>Save</button>
          </Fragment>
          : <span draggable={this.props.draggable} onDragStart={this.handleDragStart}>{this.props.value}</span>}
        <button onClick={this.handleDelete}>Delete</button>
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
