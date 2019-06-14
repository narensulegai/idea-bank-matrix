import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";

class FunctionName extends Component {
  state = {
    functionHierarchy: [
      {
        name: 'HR', children: [
          {name: 'Sub1', children: []}
        ]
      }
    ]
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleFunctionNameChange = (i, name) => {
    const functionHierarchy = this.state.functionHierarchy.slice(0);
    functionHierarchy[i].name = name;
    this.setState({functionHierarchy});
  };

  handleAddNewFunction = () => {
    const functionName = this.refs.newFunction.value;
    const functionHierarchy = this.state.functionHierarchy.slice(0);
    functionHierarchy.push({name: functionName, children: []});
    this.setState({functionHierarchy});
    this.refs.newFunction.value = "";
  };

  handleFunctionNameDelete = (index) => {
    const functionHierarchy = this.state.functionHierarchy.slice(0);
    functionHierarchy.splice(index, 1);
    this.setState({functionHierarchy});
  };

  render() {
    return (
      <div>
        <div>
          {this.state.functionHierarchy.map(({name}, i) => {
            return <div key={i}>
              <EditableText value={name} onChange={(name) => {
                this.handleFunctionNameChange(i, name)
              }}/>
              <button onClick={() => {
                this.handleFunctionNameDelete(i)
              }}>
                Delete
              </button>
            </div>
          })}
        </div>
        <div>
          <input type="text" ref="newFunction"/>
          <button onClick={this.handleAddNewFunction}>
            Add Function
          </button>
        </div>
      </div>

    );
  }
}

FunctionName.propTypes = {};

export default FunctionName;