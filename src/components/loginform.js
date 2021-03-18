import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
class LoginForm extends React.Component {
    render() { 
        return <Button onClick={this.props.signin} color='linkedin'>
        <Icon name='microsoft' /> Sign In with Microsoft
      </Button>;
    }
}
export default LoginForm;