import React from 'react';
import { Button, Icon ,Grid} from 'semantic-ui-react'

class UnregForm extends React.Component {

  htmlstring;  

  constructor(props){   
    super (props);
    
    this.state={htmlstring:""}    
  }

  GetConfirmationHTML=() => {
    fetch("https://apps.nursehack4health.org/EmailTemplateV1.htm")
        .then(r => r.text())
        .then(text => {
//          console.log('text decoded:', text);
          this.setState({htmlstring:text});
        })
  }

  componentDidMount=() =>{      
    this.GetConfirmationHTML();
  }


    render() {
//        console.log(this.state.htmlstring) ;
        
        return (
          
    
          <Grid textAlign='left'  verticalAlign='middle' style={{ maxWidth: 450 }}>
          <Grid.Column > 
          
          <span style={{float: 'right'}}>
                        <Button onClick={this.props.unregister} color='red'>
                        <Icon name='microsoft' /> Unregister
                      </Button>
                      </span>
                      <h3>Thank you for registering for NurseHack4Health!</h3>
                      <p>If you would like to unregister, click the unregister button.<br></br>
                      If you would like to leave the NH4H Community Team, <a href="https://support.microsoft.com/en-us/office/leave-a-teams-free-organization-a8fd9675-fb0c-4e64-81a5-c6f155657462">click here</a> for the instructions on how to leave a MS Teams Orginization.
                      </p>
                      
                      
                      <div dangerouslySetInnerHTML={{ __html: this.state.htmlstring }} /> 
          
          
          
          </Grid.Column>
          </Grid>
        );
    }
}
export default UnregForm;

