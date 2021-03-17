import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import nh4h from './apis/nh4h';
import * as Msal from "msal";


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
      email: "",
      userid: null,
      visible: true
    }
  }

 



  componentDidMount() {

    if (this.state.msalInstance.getAccount()) {
      console.log("Signted in");
      this.processSignIn();
    

    } 
  }
  processSignIn =() =>{
    let id = this.state.msalInstance.getAccount();
    this.setState({
      loggedin: true,
      email: id.userName,
      username: id.name
    }, () => {
      this.getUserID();        
    });
  }
  getUserID = () => {
    let body = { UserMSTeamsEmail: this.state.email };
    nh4h.post('/users/msemail', body)
      .then((response) => {
        if(!response.returnError){
        this.setState({ 
          userObject:response.data,
          userid: response.data.userId,
          mySkills: response.data.mySkills
         });
        }
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
  handleDismiss = () => {
    this.setState({ visible: false })
  }
 
  render() { 
    
    

  

    return(
      <div>
        {!this.state.loggedin?
              <Button onClick={this.signin} color='linkedin'>
              <Icon name='linkedin' /> Sign In with Microsoft
            </Button>
             
              :
        
        <div className="ui segment">
         Welcome {this.state.email} You are Logged
        </div>
  }
      </div>
    );
  }
}

export default App;