import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

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

  render() {
    return (
      <Fragment>
        {this.state.editMode
          ? <Fragment>
            <input type="text" ref="inputRef" defaultValue={this.props.value}/>
            <button onClick={this.handleSave}>Save</button>
          </Fragment>
          : this.props.value}
      </Fragment>
    );
  }
}

EditableText.propTypes = {};

export default EditableText;
