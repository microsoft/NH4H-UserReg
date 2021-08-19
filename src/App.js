import React, { Component,useState } from 'react';
import * as Msal from "msal";
import {Loader } from 'semantic-ui-react'
import User from './apis/user';
import RegForm from "./components/regform"
import LoginForm from "./components/loginform"
import UnregForm from  "./components/unregform"
import UnregConf from  "./components/unregconf"
import Survey from './apis/survey';
import EmailForm from './components/emailform';
//import React, { useState } from "react";
//import { PageLayout } from "./components/PageLayout";
//import { ProfileData } from "./components/ProfileData";

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
      unreg: false,
      survey: new Survey(),
      submitting:true,
      apiScope:"api://05fc1a93-6c0e-4af6-9424-368474961462/user_impersonation"
    }
  }

  getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

  componentDidMount() {
    if (this.state.msalInstance.getAccount()) {   
      this.processSignIn();
    }else{
      this.setState({submitting:false});
    } 
  }
  checkIfEmailInString(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  getAccessToken =(authResp) => {
    this.state.user.setAuthToken(authResp.accessToken);
    if(!this.checkIfEmailInString(this.state.user.email)){
      //if there's no valid email set for the user then ask for an email
       this.setState({
         loggedin: true,submitting:false,needemail:true});
     }else{
       //If a code is present then first check code then pre reg
       let token = this.getQueryVariable("token");
     
       if(token){      
         this.state.user.checkCode(token)
         .then(()=>{      
             this.preregister();
         });
       }else{
         this.preregister();
       }
     }
  }

  processSignIn =() =>{
    this.setState({submitting:true},()=>{
      let id = this.state.msalInstance.getAccount(); 
      this.state.user.email=id.userName;
      
      let userReq = {
        scopes: [this.state.apiScope] 
      };      

      // Get token for HackAPI ---
      this.state.msalInstance.acquireTokenSilent(userReq)
        .then((resp) => this.getAccessToken(resp))
        .catch(error => {        
          this.state.msalInstance.acquireTokenRedirect({
            ...userReq,
            redirectUri: "https://apps.nursehack4health.org/Registration/"
        })
      });
      // --- End Get Token

      if(this.state.email){
        //if user logged in with a phone or skype and an email had to be entered manually
        this.state.user.email=this.state.email;
      }
      this.state.user.name=id.name;

       
    });
  }
  
  signin = ()=>{
    let loginRequest = {
      scopes: ["user.read"] 
    };    

    if(this.state.msalInstance.loginRedirect(loginRequest)){     
      this.state.msalInstance.loginRedirect(loginRequest)
        .then(response => {
          this.processSignIn();
        })
        .catch(err => {
          // handle error
          this.setState({submitting:false});
        });
      }
  } 
  updateEmail=(email)=>{
    this.setState({ email:email, needemail:false});
    this.processSignIn();
  }

  preregister =() =>{
    this.state.user.getUserID()
    .then(()=>{
      this.setState({
      loggedin: true,
      submitting:false
    });}) 
  }


  unregister=()=>{
    let nUser=this.state.user;
    nUser.active=false;
    this.setState({unreg:true});
    this.doUserUpdateAndShowSpinner(nUser);  
  }
  
  updateUser=(newUser)=>{

    let nUser=this.state.user;

    if(this.state.user.role==='Preregistrant' ){
      nUser.role="Hacker";
    }
    nUser.email=newUser.email;
    nUser.optin=newUser.optin;
    nUser.displayname=newUser.displayname;
    nUser.active=newUser.active;
    nUser.msftnewsletter=newUser.msftnewsletter;
    nUser.jnjnewsletter=newUser.jnjnewsletter;
    nUser.sonsielnewsletter=newUser.sonsielnewsletter;
    this.doUserUpdateAndShowSpinner(nUser);
  }
  
  doUserUpdateAndShowSpinner=(nUser)=>{
    this.setState({
      user:nUser,
      submitting:true
    },()=>{
      this.state.user.updateUser()
      .then(()=>{
        this.setState({
          submitting:false
        });
      });
    });
  }

  render() { 

    return(

      this.state.submitting?
      <div>
        <Loader active size="massive" inline='centered' >Loading...</Loader>
      </div>
      
      :
        <div >        
          {!this.state.loggedin?
            <LoginForm signin={this.signin}/>
            :
              this.state.needemail?
                <EmailForm updateEmail={this.updateEmail}/>
              :
                this.state.user.active?
                  <UnregForm unregister={this.unregister} />
                :
                  this.state.unreg?
                    <UnregConf />
                  :
                    <RegForm updateUser={this.updateUser} user={this.state.user}
            />
          }
        </div>      
    );
  }
}

export default App;