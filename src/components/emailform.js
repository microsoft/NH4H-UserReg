import React from 'react';
import {Header, Loader, Message, Button, Checkbox, Form, Select, Input } from 'semantic-ui-react'





class EmailForm extends React.Component {
  constructor(props){
    super(props);
   
    this.state={
        email:"",
        RegError: false,
        formvalid:false
      };
  }
  
  checkIfEmailInString(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  handleChange = (event,d) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    
    this.setState({
      email: value,
      formvalid: this.checkIfEmailInString(value)
    });    
  }



  
  handleSubmit=()=>{
    this.props.updateEmail(this.state.email) ;
  }
  
  
  render() {
   
    return(
      <div>
          <Header as='h2'>
            You'll need to supply an email address
          </Header>               
         
          <Form error={this.state.RegError}> 
          

                <label>Email   (Will be used to send you hackathon invite</label>
                <Form.Group inline>            
                  <Form.Field error={this.state.RegError}
                    required
                    name='email'                    
                    control={Input} 
                    onChange={ this.handleChange }                     
                    value={this.state.email}                                         
                  />
              </Form.Group>
            <Button disabled={!this.state.formvalid} onClick={this.handleSubmit} type='submit'>Continue</Button>

          </Form>
        </div>
    );
  }
}

export default EmailForm;