import React from 'react';
import { Button, Icon, Grid, Header,Image } from 'semantic-ui-react'
class LoginForm extends React.Component {
    render() { 
        return (
        
        
        
        
        <Grid textAlign='left'  verticalAlign='middle' style={{ maxWidth: 450 }}>
<Grid.Column > 

<Header >

<br></br>
<br></br>
  Sign In!




</Header>               
<br></br>



<Button  primary onClick={this.props.signin} >
         Sign In with Microsoft
      </Button>

</Grid.Column>
</Grid>
        
        
        )
    }
}
export default LoginForm;

