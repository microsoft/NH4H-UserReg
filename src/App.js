import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import nh4h from './apis/nh4h';
import RegForm from "./components/regform"
import * as Msal from "msal";
import User from './apis/user';

class App extends Component {
  constructor(props){
    super(props);
    let msalConfig = {
      auth: {
        clientId: 'b3544b0c-1209-4fe8-b799-8f63a0179fa0',
        authority: "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674",
        //redirectUri:"/loggedin" 
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance: msalI,
      user: new User(),
      loggedin: false,
    }
  }

  componentDidMount() {
    if (this.state.msalInstance.getAccount()) {   
      this.processSignIn();
    } 
  }
  processSignIn =() =>{
    let id = this.state.msalInstance.getAccount(); 
    this.state.user.email=id.userName;
    this.state.user.name=id.name;
    this.state.user.getUserID()
    .then(()=>{this.setState({
      loggedin: true
    });})        
    
  }
  
  signin = ()=>{
    let loginRequest = {
      scopes: ["user.read"] 
    };
    this.state.msalInstance.loginRedirect(loginRequest)
      .then(response => {
        this.processSignIn();
      })
      .catch(err => {
        // handle error
      });
  } 

  updateUser=(newUser)=>{
    console.log(newUser);
  }
  
 
  render() { 

    return(
     
        <div >
        {!this.state.loggedin?
              <Button onClick={this.signin} color='linkedin'>
              <Icon name='microsoft' /> Sign In with Microsoft
            </Button>
             
              :<div>
              Welcome {this.state.user.email} 
              <RegForm updateUser={this.updateUser} user={this.state.user}/>
             </div>}
        </div>
      
    );
  }
}

export default App;