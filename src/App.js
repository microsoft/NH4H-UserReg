import React, { Component } from 'react';
import * as Msal from "msal";
import { Button, Icon } from 'semantic-ui-react'
import User from './apis/user';
import RegForm from "./components/regform"
import LoginForm from "./components/loginform"
import UnregForm from  "./components/unregform"




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
  unregister=()=>{
    let nUser=this.state.user;
    nUser.active=false;
    this.state.user.updateUser()
    .then(()=>{
      this.setState({user:nUser});
    });
  }
  updateUser=(newUser)=>{
    let nUser=this.state.user;
    nUser.email=newUser.email;
    nUser.optin=newUser.optin;
    nUser.displayname=newUser.displayname;
    nUser.active=newUser.active;
    nUser.role=newUser.role;
    nUser.updateUser()
    .then(()=>{
      this.setState({
        user:nUser
      });
    });
    
    console.log(newUser);
  }
  
 
  render() { 

    return(
    <div >
      {!this.state.loggedin?
        <LoginForm signin={this.signin}/>
        : 
          this.state.user.active?
            <UnregForm unregister={this.unregister} />
          :
            <RegForm updateUser={this.updateUser} user={this.state.user}/>
        }
        </div>
      
    );
  }
}

export default App;