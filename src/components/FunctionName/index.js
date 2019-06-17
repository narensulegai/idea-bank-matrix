import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";
import Ideas from "../Ideas";


class FunctionName extends Component {
  state = {
    ideas: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleFunctionNameChange = (i, name) => {
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy[i].name = name;
    this.props.onChange(functionHierarchy);
  };

  handleAddNewFunction = () => {
    const functionName = this.refs.newFunction.value;
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy.push({name: functionName, children: [], ideas: []});
    this.props.onChange(functionHierarchy);
    this.refs.newFunction.value = "";
  };

  handleFunctionNameDelete = (index) => {
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy.splice(index, 1);
    this.props.onChange(functionHierarchy);
  };

  handleChildFunctionHierarchyChange = (newFunctionHierarchy, i) => {
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy[i].children = newFunctionHierarchy;
    this.props.onChange(functionHierarchy);
  };

  handleIdeasChange = (i, ideas) => {
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy[i].ideas = ideas;
    this.props.onChange(functionHierarchy);
  };

  render() {
    return (
      <div style={{paddingLeft: 20, paddingBottom: 20}}>
        <div>
          {this.props.functionHierarchy.map(({name, ideas}, i) => {
            return <div key={i}>
              <div>
                <EditableText value={name}
                              onChange={(name) => {
                                this.handleFunctionNameChange(i, name)
                              }}
                              onDelete={() => {
                                this.handleFunctionNameDelete(i)
                              }}
                />
              </div>
              <div>
                <div>Ideas</div>
                <Ideas ideas={ideas} onChange={(newIdeas) => {
                  this.handleIdeasChange(i, newIdeas)
                }}/>
              </div>
              <div>
                <FunctionName
                  functionHierarchy={this.props.functionHierarchy[i].children}
                  onChange={(f) => {
                    this.handleChildFunctionHierarchyChange(f, i)
                  }}/>
              </div>
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