import React, { Component } from 'react';
import * as Msal from "msal";
import {Loader, Button, Icon } from 'semantic-ui-react'
import User from './apis/user';
import RegForm from "./components/regform"
import LoginForm from "./components/loginform"
import UnregForm from  "./components/unregform"
import UnregConf from  "./components/unregconf"
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
      unreg: false,
      survey: new Survey(),
      submitting:true
    }
  }

  getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    //console.log(query)//"token1=123&token2=456&token3=789"
    var vars = query.split("&");
    //console.log(vars) //[ 'token1=123', 'token2=456', 'token3=789' ]
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      //console.log(pair)//[ 'token1', '123' ][ 'token2', '456' ][ 'token3', '789' ] 
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
  processSignIn =() =>{
    this.setState({submitting:true},()=>{
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
        //console.log("no code in qs");
        this.preregister();
      }   
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
            <div>
              <p align='center'>Please sign in to register:</p>         
              <p align='center'><LoginForm signin={this.signin}/></p>
            </div>
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