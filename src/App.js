import React, { Component } from 'react';
import * as Msal from "msal";
import { Button, Icon } from 'semantic-ui-react'
import User from './apis/user';
import RegForm from "./components/regform"
import LoginForm from "./components/loginform"
import UnregForm from  "./components/unregform"
import Survey from './apis/survey';

class App extends Component {
  constructor(props){
    super(props);
    let msalConfig = {
      auth: {
        clientId: 'b3544b0c-1209-4fe8-b799-8f63a0179fa0',        
        authority: "https://login.microsoftonline.com/common",
        //authority: "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674",
        //redirectUri:"/loggedin" 
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance: msalI,
      user: new User(),
      loggedin: false,
      survey: new Survey()
    }
  }

  getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    console.log(query)//"token1=123&token2=456&token3=789"
    var vars = query.split("&");
    console.log(vars) //[ 'token1=123', 'token2=456', 'token3=789' ]
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      console.log(pair)//[ 'token1', '123' ][ 'token2', '456' ][ 'token3', '789' ] 
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
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
    //If a code is present then first check code then pre reg
    let token = this.getQueryVariable("token");

    if(token){      
      this.state.user.checkCode(token)
      .then(()=>{      
        this.preregister();
      });
    }else{
      console.log("no code in qs");
      this.preregister();
    }       
    
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

  preregister =() =>{
    this.state.user.getUserID()
    .then(()=>{
      this.setState({
      loggedin: true
    });}) 
  }
  unregister=()=>{
    let nUser=this.state.user;
    nUser.active=false;
    nUser.role="Unregistered"
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
    nUser.msftnewsletter=newUser.msftnewsletter;
    nUser.jnjnewsletter=newUser.jnjnewsletter;
    nUser.sonsielnewsletter=newUser.sonsielnewsletter;
    nUser.updateUser()
    .then(()=>{
      this.setState({
        user:nUser
      });
    });
    
    console.log(newUser);
  }
  
  updateSurvey=(newSurvey)=>{
    let nSurvey=this.state.survey;
    nSurvey.userid=newSurvey.userid;
    nSurvey.pronoun=newSurvey.pronoun;
    nSurvey.country=newSurvey.country;
    nSurvey.usstate=newSurvey.usstate;
    nSurvey.company=newSurvey.company;
    nSurvey.ethnicity=newSurvey.ethnicity;
    nSurvey.expertise=newSurvey.expertise;
    nSurvey.student=newSurvey.student;
    nSurvey.updateSurvey()
    .then(()=>{
      this.setState({
        survey:nSurvey
      });
    });
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
              <RegForm updateUser={this.updateUser} updateSurvey={this.updateSurvey} user={this.state.user}
          />
        }
      </div>      
    );
  }
}

export default App;