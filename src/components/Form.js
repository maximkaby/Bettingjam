import React, { Component } from 'react';
import Inputs from './Inputs';
import Button from './SubmitButton';

export default class extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="form">
        <Inputs onChange={this.props.inputOnChange} value={this.props.value} />
        <Button submit={this.props.submitRegistration} />
      </div>
    );
  }
}
