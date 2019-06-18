import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableText from "../EditableText";
import Ideas from "../Ideas";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import {PaddedPaper} from '../Styled';
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Typography from '@material-ui/core/Typography';

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

        <div className="row small-margin-top">

          <TextField
            fullWidth={true}
            placeholder="HR, Finance, IT ..."
            inputRef={(input) => {
              this.newFunction = input;
            }}
            label="Add a function"
            defaultValue={this.props.value}
            margin="none"
            onBlur={this.handleSave}/>

          <Fab size="small" color="primary" onClick={this.handleAddNewFunction}>
            <AddIcon/>
          </Fab>

        </div>

        <div>
          {this.props.functionHierarchy.map(({name, ideas}, i) => {
            return <PaddedPaper key={i}>
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
              <PaddedPaper>
                <Typography variant="subtitle2" gutterBottom={false}>
                  Add ideas for {name}
                </Typography>
                <Ideas ideas={ideas} onChange={(newIdeas) => {
                  this.handleIdeasChange(i, newIdeas)
                }}/>
              </PaddedPaper>
              {<div>
                <FunctionName
                  functionHierarchy={this.props.functionHierarchy[i].children}
                  onChange={(f) => {
                    this.handleChildFunctionHierarchyChange(f, i)
                  }}/>
              </div>}
            </PaddedPaper>
          })}
        </div>

      </div>
    );
  }
}

FunctionName.propTypes = {};

export default FunctionName;