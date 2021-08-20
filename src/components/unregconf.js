import React from 'react';
import { Header,Grid,Image } from 'semantic-ui-react'

class UnregConf extends React.Component {

  htmlstring;  

  constructor(props){   
    super (props);
    
  
  }



    render() {

        
        return (
          
          <Grid textAlign='left'  verticalAlign='middle' style={{ maxWidth: 450 }}>
          <Grid.Column > 
         
          <Header >
          <div>
          <Image src='/logo.png' size="massive"></Image>
          </div>
          
          <br></br>
          <br></br>
          You are unregistered!
      
          <Header.Subheader>
                Sorry to see you go.  
                If you would like to leave the NH4H Community Team, <a href="https://support.microsoft.com/en-us/office/leave-a-teams-free-organization-a8fd9675-fb0c-4e64-81a5-c6f155657462">click here</a> for the instructions on how to leave a MS Teams Orginization.
            </Header.Subheader>
    
          </Header>               
          <br></br>
      
          
        
  
         
          </Grid.Column>
          </Grid>
        );
    }
}
export default UnregConf;

