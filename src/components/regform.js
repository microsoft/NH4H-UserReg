import React from 'react';
import User from '../apis/user';
import {Message, Button, Checkbox, Form } from 'semantic-ui-react'
import { findAllByTestId } from '@testing-library/react';

class RegForm extends React.Component {
  constructor(props){
    super(props);
   
    this.state={
        email:this.props.user.email,
        optin:this.props.user.optin,
        name:this.props.user.name,
        submitting:false

    };
  }
  
  handleChange=(e)=> {
    let tmp={}; 
    tmp[e.target]=e.value;
    this.setState(tmp);
  };

  handleCheck=(e)=>{
    this.setState({optin:!this.state.optin});
  }

  handleSubmit=()=>{
    this.setState({submitting:true},()=>{
      let nUser={
        name:this.state.name,
        email:this.state.email,
        optin:this.state.optun
      };
      this.props.updateUser(nUser);
    });
    
  }
  
  render() {
   
    return(
      this.state.submitting?<h1>Submitting</h1> :
      <div >
        {this.props.user.active?<Button >Unregister</Button>:""}
        <Message>Registration Incomplete
          You must fill in this form to be registered.
        </Message>
        <Form>
          Some basic info so we can get you on a team:
          <Form.Field>
            <label>Your Email</label>
            <input onChange={ this.handleChange } value={this.state.email} name="email" />
          </Form.Field>
          <Form.Field>
            <label>How would you like your name displayed?</label>
            <input onChange={ this.handleChange } value={this.state.name} name="name" />
          </Form.Field>

    <Form.Field>
    <Checkbox value={this.state.optin} name="optin" onClick={this.handleCheck} toggle label='I consent' />

     
    </Form.Field>
    <Button onClick={this.handleSubmit} disabled={this.state.optin} type='submit'>Register</Button>
  </Form>
      </div>
    )
  }
}

export default RegForm;