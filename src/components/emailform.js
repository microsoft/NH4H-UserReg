import React from 'react';
import {Header, Button, Form, Input,Grid,Image} from 'semantic-ui-react'





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
      <Grid textAlign='left'  verticalAlign='middle' style={{ maxWidth: 450 }}>
          <Grid.Column > 
         
          <Header >
          <div>
          <Image src='/logo.png' size="massive"></Image>
          </div>
          
          <br></br>
          <br></br>
          You'll need to supply an email address
      
       
    
          </Header>               
          <br></br>
      
          <Form error={this.state.RegError}> 
          

                <label>Email   (Will be used to send you hackathon invite</label>
                <Form.Group inline>            
                  <Form.Field error={this.state.RegError}
                    required
                    name='email'
                    type="email"                    
                    control={Input} 
                    onChange={ this.handleChange }                     
                    value={this.state.email}                                         
                  />
              </Form.Group>
            <Button disabled={!this.state.formvalid} onClick={this.handleSubmit} type='submit'>Continue</Button>

          </Form>
        
  
         
          </Grid.Column>
          </Grid>
    );
  }
}

export default EmailForm;



