import React from 'react';
import { Button,Header } from 'semantic-ui-react'

class UnregConf extends React.Component {

  htmlstring;  

  constructor(props){   
    super (props);
    
  
  }



    render() {

        
        return (
          
    
          <div>  
            <Header as='h2'>
            You are unregistered!
            <Header.Subheader>
                Sorry to see you go.  Click the button below to re-register.
            </Header.Subheader>
          </Header>   
           
           <Button onClick={this.props.reregister} >Register</Button>
          </div>
        );
    }
}
export default UnregConf;