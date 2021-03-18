import React from 'react';
import User from '../apis/user';
import {Loader, Message, Button, Checkbox, Form, Select, Input } from 'semantic-ui-react'
import { findAllByTestId } from '@testing-library/react';


const PronounOptions = [
  {text:'He',value: 'He'},
  {text:'She',value: 'She'},
  {text:'They',value: 'They'},
  {text:'Ze',value: 'Ze'},
  {text:'Prefer not to say',value: 'Prefer not to say'},
  {text:'Other',value: 'Other'}
]

const EthnicityOptions = [
  {text:'American Indian or Alaska Native',value: 'American Indian or Alaska Native'},
  {text:'Asian',value: 'Asian'},
  {text:'Black or African American',value: 'Black or African American'},
  {text:'Hispanic / Latinx',value: 'Hispanic / Latinx'},
  {text:'Native Hawaiian or Other Pacific Islander',value: 'Native Hawaiian or Other Pacific Islander'},
  {text:'White',value: 'White'},
  {text:'Other',value: 'Other'},
  {text:'Prefer not to say',value: 'Prefer not to say'}
]

const ExpertiseOptions = [
  {text:'Nurse [LPN, RN, NP/DNP, PhD]',value: 'Nurse [LPN, RN, NP/DNP, PhD]'},
  {text:'Non-Nurse Healthcare Professional [PT/OT/PA/MD/MSW/RD/CHW/etc.]',value: 'Non-Nurse Healthcare Professional [PT/OT/PA/MD/MSW/RD/CHW/etc.]'},
  {text:'Developer [Front End, Back End, Full Stack, Computer Engineers, Software Engineers]',value: 'Developer [Front End, Back End, Full Stack, Computer Engineers, Software Engineers]'},
  {text:'Engineer [Mechanical, Industrial, Chemical, etc.]',value: 'Engineer [Mechanical, Industrial, Chemical, etc.]'},
  {text:'Public Health [Population, Community, Health]',value: 'Public Health [Population, Community, Health]'},
  {text:'Communications [Marketing, Communications, TV/Film production, Journalism, Publishing etc.]',value: 'Communications [Marketing, Communications, TV/Film production, Journalism, Publishing etc.]'},
  {text:'Information Technology [Data, Web Development, Informatics]',value: 'Information Technology [Data, Web Development, Informatics]'},
  {text:'“Bench” Sciences [Biology, Chemistry, Physics, Genetics/Genomics]',value: '“Bench” Sciences [Biology, Chemistry, Physics, Genetics/Genomics]'},
{text:'Social Sciences [Psychology, Sociology, Anthropology, etc.]',value: 'Social Sciences [Psychology, Sociology, Anthropology, etc.]'}
]

const StateOptions = [
  {text:'Alabama',value: 'Alabama'},
  {text:'Alaska',value: 'Alaska'},
  {text:'Arizona',value: 'Arizona'},
  {text:'Arkansas',value: 'Arkansas'},
  {text:'California',value: 'California'},
  {text:'Colorado',value: 'Colorado'},
  {text:'Connecticut',value: 'Connecticut'},
  {text:'Delaware',value: 'Delaware'},
  {text:'Florida',value: 'Florida'},
  {text:'Georgia',value: 'Georgia'},
  {text:'Hawaii',value: 'Hawaii'},
  {text:'Idaho',value: 'Idaho'},
  {text:'IllinoisIndiana',value: 'IllinoisIndiana'},
  {text:'Iowa',value: 'Iowa'},
  {text:'Kansas',value: 'Kansas'},
  {text:'Kentucky',value: 'Kentucky'},
  {text:'Louisiana',value: 'Louisiana'},
  {text:'Maine',value: 'Maine'},
  {text:'Maryland',value: 'Maryland'},
  {text:'Massachusetts',value: 'Massachusetts'},
  {text:'Michigan',value: 'Michigan'},
  {text:'Minnesota',value: 'Minnesota'},
  {text:'Mississippi',value: 'Mississippi'},
  {text:'Missouri',value: 'Missouri'},
  {text:'MontanaNebraska',value: 'MontanaNebraska'},
  {text:'Nevada',value: 'Nevada'},
  {text:'New Hampshire',value: 'New Hampshire'},
  {text:'New Jersey',value: 'New Jersey'},
  {text:'New Mexico',value: 'New Mexico'},
  {text:'New York',value: 'New York'},
  {text:'North Carolina',value: 'North Carolina'},
  {text:'North Dakota',value: 'North Dakota'},
  {text:'Ohio',value: 'Ohio'},
  {text:'Oklahoma',value: 'Oklahoma'},
  {text:'Oregon',value: 'Oregon'},
  {text:'PennsylvaniaRhode Island',value: 'PennsylvaniaRhode Island'},
  {text:'South Carolina',value: 'South Carolina'},
  {text:'South Dakota',value: 'South Dakota'},
  {text:'Tennessee',value: 'Tennessee'},
  {text:'Texas',value: 'Texas'},
  {text:'Utah',value: 'Utah'},
  {text:'Vermont',value: 'Vermont'},
  {text:'Virginia',value: 'Virginia'},
  {text:'Washington',value: 'Washington'},
  {text:'West Virginia',value: 'West Virginia'},
  {text:'Wisconsin',value: 'Wisconsin'},
  {text:'Wyoming',value: 'Wyoming'}
]



class RegForm extends React.Component {
  constructor(props){
    super(props);
   
    this.state={
        email:this.props.user.email,
        optin:this.props.user.optin,
        displayname:this.props.user.displayname,
        role:'Hacker', //this should be updated on one time keys
        submitting:false

    };
  }
  
  handleChange = (event,d) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    if(d){
      name=d.name;
      value=d.value;
    }
    this.setState({
      [name]: value
    });
  }




  handleCheck=(e)=>{
    this.setState({optin:!this.state.optin});
  }

  handleSubmit=()=>{
    this.setState({submitting:true},()=>{
      console.log("Username is: "+ this.state.displayname);
      let nUser={
        displayname:this.state.displayname,
        email:this.state.email,
        optin:this.state.optun,
        active:true,
        role:this.state.role
      };
      this.props.updateUser(nUser);
    });
    
  }
  
  render() {
   
    return(
      this.state.submitting?
      <div>
        <Loader active inline='centered' />
      </div>:
      <div >
        {this.props.user.active?<Button >Unregister</Button>:""}
        <Message>Registration Incomplete
          You must fill in this form to be registered.
        </Message>
        <Form>
          Some basic info so we can get you on a team:
          <Form.Field>
            <label>Your Email</label>
            <input onChange={ this.handleChange } value={this.state.email} name="email" />
          </Form.Field>
          <Form.Field>
            <label>How would you like your name displayed?</label>
            <input onChange={ this.handleChange } value={this.state.displayname} name="displayname" />
          </Form.Field>
        

          <Form.Group inline>
            <label>Are you interested in receiving the Johnson & Johnson Notes on Nursing monthly newsletter with more inspiring stories of nurse-led innovation and nurse innovation resources?</label>
            <Form.Field
              id='cbxJNJNewsLetter'
              control={Checkbox}
              label='Yes'
            />
          </Form.Group>
          
          <Form.Group inline>
            <label>Are you interested in receiving the SONSIEL newsletter to join a growing community of nurse innovators, leaders and entrepreneurs?</label>
            <Form.Field
              id='cbxSONSIELNewsLetter'
              control={Checkbox}
              label='Yes'
            />
          </Form.Group>
          
          <Form.Group inline>
            <label>Are you interested in receiving the Microsoft Health and Life Sciences newsletter?</label>
            <Form.Field
              id='cbxMSFTNewsLetter'
              control={Checkbox}
              label='Yes'
            />
          </Form.Group>
          <Form.Field    
            control={Checkbox} 
            value={this.state.optin} 
            name="optin" 
            onClick={this.handleCheck} 
            toggle 
            label='I agree to the Terms and Conditions' 
           />

           <br></br>

          <Message>Optional Information used only to report on NH4H Participation</Message>
          
          <Form.Group widths='equal'>
            <Form.Field
              id='ddlPronoun'
              control={Select}
              label='Preferred Pronoun'
              options={PronounOptions}
              placeholder='Pronoun'
            />
            <Form.Field
              id='tbxCountry'
              control={Input}
              label='Country of Residence'
              placeholder='Country'
            />
            <Form.Field
              id='ddlUSState'
              control={Select}
              label='U.S. State (if applicable)'
              options={StateOptions}
              placeholder='USState'
            />
          </Form.Group>
          
          <Form.Field
              id='tbxCompany'
              control={Input}
              label='Health System/Company/Organization Affiliations'
              placeholder='Company'
          />
          
          
          <Form.Field
              id='ddlEthnicity'
              control={Select}
              label='As part of our commitment to making NurseHack4Health more inclusive, please share your preferred Race/Ethnicity identification.'
              options={EthnicityOptions}
              placeholder='Ethnicity'
          />
            
          <Form.Field
              id='ddlExpertise'
              control={Select}
              label='How would you classify your primary area of expertise?'
              options={ExpertiseOptions}
              placeholder='Expertise'
          />
            
          
          <Form.Group inline>
            <label>Are you a recent graduate [under 2yrs], nursing student or currently enrolled in a nursing program?</label>
            <Form.Field
              id='cbxStudent'
              control={Checkbox}
              label='Yes'
            />
          </Form.Group>
          
       
          
     
          <Button onClick={this.handleSubmit} disabled={this.state.optin} type='submit'>Register</Button>

    </Form>
      </div>
    )
  }
}

export default RegForm;