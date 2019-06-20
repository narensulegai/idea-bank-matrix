import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";
import Ideas from "../Ideas";
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {paperPadding} from '../Styled';
import Paper from 'material-ui/Paper';

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
    const functionName = this.refs.newFunction.input.value;
    const functionHierarchy = this.props.functionHierarchy.slice(0);
    functionHierarchy.push({name: functionName, children: [], ideas: []});
    this.props.onChange(functionHierarchy);
    this.refs.newFunction.input.value = "";
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
      <div>

        <div className="row small-margin-top">

          <TextField
            fullWidth={true}
            hintText="HR, Finance, IT ..."
            ref='newFunction'
            floatingLabelText="Add a function"
            defaultValue={this.props.value}
          />
          <FloatingActionButton primary="true" mini onClick={this.handleAddNewFunction}>
            <ContentAdd/>
          </FloatingActionButton>

        </div>

        <div>
          {this.props.functionHierarchy.map(({name, ideas}, i) => {
            return <Paper key={i} style={paperPadding}>
              <div>
                <EditableText value={name}
                              onChange={(name) => {
                                this.handleFunctionNameChange(i, name)
                              }}
                              onDelete={() => {
                                this.handleFunctionNameDelete(i)
                              }}
                              label="Function name"
                />
              </div>
              <Paper style={paperPadding}>
                <h4>
                  Add ideas for {name}
                </h4>
                <Ideas ideas={ideas} onChange={(newIdeas) => {
                  this.handleIdeasChange(i, newIdeas)
                }}/>
              </Paper>
              {<div>
                <FunctionName
                  functionHierarchy={this.props.functionHierarchy[i].children}
                  onChange={(f) => {
                    this.handleChildFunctionHierarchyChange(f, i)
                  }}/>
              </div>}
            </Paper>
          })}
        </div>

      </div>
    );
  }
}

FunctionName.propTypes = {};

export default FunctionName;