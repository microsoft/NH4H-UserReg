import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
class UnregForm extends React.Component {
    render() { 
        return <div> <p>You are currently registered for NurseHack4Health!</p>
        <Button onClick={this.props.unregister} color='red'>
        <Icon name='microsoft' /> UnRegister
      </Button>
      </div>
      ;
    }
}
export default UnregForm;