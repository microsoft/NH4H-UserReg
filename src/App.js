import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import nh4h from './apis/nh4h';
import RegForm from "./components/regform"
import * as Msal from "msal";
class User {
  static APIURL='/users/regemail';
  static ROLE="UserRole";
  static REGEMAIL="UserRegEmail";
  static TEAMSEMAIL="UserMSTeamsEmail";
  static DISPLAYNAME="UserDisplayName";
  static TIMECOMMITMENT="UserTimeCommitment";
  static ACTIVE="Active";
  static SKILLS="tblUserSkillMatch";
  static OPTOUT="UserOptOut";
  static SKILL="UserSkill";
 
 userid;
 email;
 name;
 role;
 mySkills;
 attemptedPreReg;
 active;
 constructor(){
  this.userid=false;
  this.role="Preregistrant";
  this.active=false;
  this.attemptedPreReg=false;
 }

 /**
  * sets user id, preregisters user if needed
  */
 getUserID = () => {
  let body = {};
  body[User.REGEMAIL] = this.email ;
  nh4h.post(User.APIURL, body)
    .then((response) => {
      if(!response.returnError){
        
        this.userid= response.data.userId;
        this.mySkills= response.data.mySkills;
       
      }else{
        console.log("Not preregistered");
        this.preRegister();
      }
    });
}
/**
 * This is here for documentation purposes and won't be called b/c getting the userID auto-reregisters user
 */
isPreregistered(){
  return this.userid?true:false;
}

preRegister=()=>{
  //circuit breaker to prevent infinite loops
  if(this.attemptedPreReg) {return;}
  let body={};
    body[User.REGEMAIL]=this.email;
    body[User.TEAMSEMAIL]=this.email;
    body[User.ROLE]=this.role;
    body[User.ACTIVE]=this.active;
    nh4h.post(User.APIURL, body)
    .then((response)=>{
      if(response.returnError){
        this.attemptedPreReg=true;
      }else{
        this.getUserID();
      }
    })
    .catch(err => {
      this.attemptedPreReg=true;
      console.error(err);
    });
    ;
}

}

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
    this.state.user.getUserID();        
    this.setState({
      loggedin: true
    });
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
  
 
  render() { 
    
    

  

    return(
      <div>
        <div >
        {!this.state.loggedin?
              <Button onClick={this.signin} color='linkedin'>
              <Icon name='linkedin' /> Sign In with Microsoft
            </Button>
             
              :""}
        </div>
        
        <div>
         Welcome {this.state.user.email} 
         <RegForm/>
        </div>
  }
      </div>
    );
  }
}

export default App;