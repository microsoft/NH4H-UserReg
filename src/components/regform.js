import React from 'react';
import {Header, Loader, Message, Button, Checkbox, Form, Select, Input } from 'semantic-ui-react'
import { findAllByTestId } from '@testing-library/react';




class RegForm extends React.Component {
  constructor(props){
    super(props);
   
    this.state={
        email:this.props.user.email,
        optin:this.props.user.optin,
        displayname:this.props.user.displayname,
        submitting:false,
        RegError: false
    };
  }
  
  handleChange = (event,d) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    if(d){
      name=d.name;
      value=d.value;
    }
    this.setState({
      [name]: value
    });    
  }

  //enable/disable email field on Change button click
  handleChangeClick=(e)=>{
    this.setState({allowemailchange:true});
  }

  //handle Checkbox selections
  handleCheck=(e)=>{
    this.setState({optin:!this.state.optin});
  }

  handleCheckmsft=(e)=>{
    this.setState({msftnewsletter:!this.state.msftnewsletter});    
  }

  handleCheckjnj=(e)=>{
    this.setState({jnjnewsletter:!this.state.jnjnewsletter});    
  }
  
  handleChecksonsiel=(e)=>{
      this.setState({sonsielnewsletter:!this.state.sonsielnewsletter});
  }


  
  handleSubmit=()=>{
    //RegForm Validation
    //Validate required fields are completed for Registration
    //Name/Email
    let em = undefined !== this.state.email ? this.state.email.length : 0;
    let dn = undefined !== this.state.displayname ? this.state.displayname.length : 0;
    
    if( em>0 && dn>0) { 

      this.setState({RegError: false});      
    
      //update user
      this.setState({submitting:true},()=>{     
        let nUser={
          displayname:this.state.displayname,
          email:this.state.email,
          optin:this.state.optun,
          active:true,
          jnjnewsletter:this.state.jnjnewsletter,
          sonsielnewsletter:this.state.sonsielnewsletter,
          msftnewsletter:this.state.msftnewsletter
        };
        this.props.updateUser(nUser);

      });    
    }
    else{
      this.setState({RegError: true});
    }    
  }
  
  
  render() {
   
    return(

      this.state.submitting?
        <div>
          <Loader active inline='centered' />
        </div>:
        <div >
          <Header as='h2'>
            Registration
            <Header.Subheader>
                You must fill in this form and accept the Terms and Conditions to register.
            </Header.Subheader>
          </Header>               
          <br></br>
          <Form error={this.state.RegError}> 

            <Message
              error
              header='Missing Required Fields'
              content='Please complete the required fields. (Email & Display Name)'
            />

            <Form.Group inline >               
              <Form.Field required>
                <label>Email (Will be used to log into Microsoft Teams.  Only change this if you use a different email address to log into Microsoft Teams)</label>
                <Form.Group inline>            
                  <Form.Field error={this.state.RegError}
                    required
                    name='email'                    
                    control={Input} 
                    onChange={ this.handleChange }                     
                    value={this.state.email}  
                    disabled={!this.state.allowemailchange}                                          
                  />
                  <Form.Field
                    name='changeemail'
                    control={Button}  
                    content='Change'
                    onClick={this.handleChangeClick}              
                  />
                </Form.Group>
              </Form.Field>
            </Form.Group>                


            <Form.Field error={this.state.RegError}
                required
                name='displayname'
                control={Input}
                onChange={ this.handleChange } 
                label='How would you like your name displayed?'
                width="5"
                value={this.state.displayname}          
            />   

            <Form.Group inline>            
              <Form.Field
                name='jnjnewsletter'
                control={Checkbox}
                onChange={ this.handleCheckjnj } 
                label='Yes'              
              />
              <label>Are you interested in receiving the Johnson & Johnson Notes on Nursing monthly newsletter with more inspiring stories of nurse-led innovation and nurse innovation resources?</label>
            </Form.Group>
            
            <Form.Group inline>            
              <Form.Field
                name='sonsielnewsletter'
                control={Checkbox}
                onChange={ this.handleChecksonsiel } 
                label='Yes'
              />
              <label>Are you interested in receiving the SONSIEL newsletter to join a growing community of nurse innovators, leaders and entrepreneurs?</label>
            </Form.Group>
            
            <Form.Group inline>            
              <Form.Field 
                name='msftnewsletter'
                control={Checkbox}
                onChange={ this.handleCheckmsft } 
                label='Yes'
              />
              <label>Are you interested in receiving the Microsoft Health and Life Sciences newsletter?</label>
            </Form.Group>
                  
            <br></br><br></br>
            <Button onClick={this.handleSubmit} type='submit'>Register</Button>

          </Form>
        </div>
    )
  }
}

export default RegForm;