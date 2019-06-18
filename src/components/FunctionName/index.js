import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";
import Ideas from "../Ideas";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import {PaddedFab} from '../Styled';

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
    const functionName = this.newFunction.value;
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy.push({name: functionName, children: [], ideas: []});
    this.props.onChange(functionHierarchy);
    this.newFunction.value = "";
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
              <div>Ideas</div>
              <Ideas ideas={ideas} onChange={(newIdeas) => {
                this.handleIdeasChange(i, newIdeas)
              }}/>
              {false && <div>
                <FunctionName
                  functionHierarchy={this.props.functionHierarchy[i].children}
                  onChange={(f) => {
                    this.handleChildFunctionHierarchyChange(f, i)
                  }}/>
              </div>}
            </div>
          })}
        </div>

        <div className="row">

          <TextField
            placeholder="HR, Finance, IT ..."
            inputRef={(input) => {
              this.newFunction = input;
            }}
            label="Function name"
            defaultValue={this.props.value}
            margin="none"
            onBlur={this.handleSave}/>

          <PaddedFab size="small" color="primary" onClick={this.handleAddNewFunction}>
            <AddIcon/>
          </PaddedFab>

        </div>
      </div>
    );
  }
}

FunctionName.propTypes = {};

export default FunctionName;