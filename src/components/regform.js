import React from 'react';
import User from '../apis/user';
import Survey from '../apis/survey';
import {Header, Loader, Message, Button, Checkbox, Form, Select, Input } from 'semantic-ui-react'
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


  //enable/disable email field
  handleChangeClick=(e)=>{
    this.setState({allowemailchange:true});
  }

  handleCheck=(e)=>{
    this.setState({optin:!this.state.optin});
  }

  handleSubmit=()=>{
    this.setState({submitting:true},()=>{     
      let nUser={
        displayname:this.state.displayname,
        email:this.state.email,
        optin:this.state.optun,
        active:true,
        role:this.state.role,        
        jnjnewsletter:this.state.jnjnewsletter,
        sonsielnewsletter:this.state.sonsielnewsletter,
        msftnewsletter:this.state.msftnewsletter
      };
      this.props.updateUser(nUser);
      
      //Capture and Insert Survey Data
      let nSurvey={
        userid:this.state.userid,
        pronoun:this.state.pronoun,
        country:this.state.country,
        usstate:this.state.usstate,
        company:this.state.company,
        ethnicity:this.state.ethnicity,
        expertise:this.state.expertise,
        student:this.state.student
      }
      this.props.updateSurvey(nSurvey);
      
    });    
  }

  render() {
   
    return(
      this.state.submitting?
      <div>
        <Loader active inline='centered' />
      </div>:
      <div >
        <Header as='h2'>
          Registration
          <Header.Subheader>
              You must fill in this form and accept the Terms and Conditions to register.
          </Header.Subheader>
        </Header>               
        <br></br>
        <Form> 

          <Message
            error
            header='Missing Required Fields'
            content='Please complete the required fields.'
          />

          <Form.Group widths='equal'>                      
            
              <Form.Field required>
                <label>Email (Only change this if you use a different email address to log into Microsoft Teams)</label>
                <Form.Group >            
                <Form.Field                   
                  name="email"                 
                  control={Input} 
                  onChange={ this.handleChange } 
                  value={this.state.email} 
                  width="11"                     
                  disabled={!this.state.allowemailchange}             
                />
                <Form.Field
                  name="changeemail"
                  control={Button}  
                  content="Change" 
                  onClick={this.handleChangeClick}              
              />
              
            </Form.Group>
              </Form.Field>
              
            <Form.Field required>
              <label >How would you like your name displayed?</label>
              <Form.Field                
                name="displayname" 
                control={Input} 
                onChange={ this.handleChange } 
                value={this.state.displayname}               
              />
            </Form.Field>
          </Form.Group>        

          <Form.Group inline>            
            <Form.Field
              name='jnjnewsletter'
              control={Checkbox}
              onChange={ this.handleChange } 
              label='Yes'              
            />
            <label>Are you interested in receiving the Johnson & Johnson Notes on Nursing monthly newsletter with more inspiring stories of nurse-led innovation and nurse innovation resources?</label>
          </Form.Group>
          
          <Form.Group inline>            
            <Form.Field
              name='sonsielnewsletter'
              control={Checkbox}
              onChange={ this.handleChange } 
              label='Yes'
            />
            <label>Are you interested in receiving the SONSIEL newsletter to join a growing community of nurse innovators, leaders and entrepreneurs?</label>
          </Form.Group>
          
          <Form.Group inline>            
            <Form.Field 
              name='msftnewsletter'
              control={Checkbox}
              onChange={ this.handleChange } 
              label='Yes'
            />
            <label>Are you interested in receiving the Microsoft Health and Life Sciences newsletter?</label>
          </Form.Group>
          
          
          <Message>
            <Form.Field required
              control={Checkbox}               
              onClick={this.handleCheck} 
              toggle 
              label='I agree to the Terms and Conditions' 
              align="center"
            />
          </Message>
        
           <br></br>

          <Message><b>Optional: </b> Information collected to report on NH4H Participant Demographics</Message>
          
          <Form.Group widths='equal'>
            <Form.Field
              name='pronoun'
              control={Select}
              onChange={ this.handleChange } 
              label='Preferred Pronoun'
              options={PronounOptions}              
            />
            <Form.Field
              name='country'
              control={Input}
              onChange={ this.handleChange } 
              label='Country of Residence'
            />
            <Form.Field
              name='usstate'
              control={Select}
              onChange={ this.handleChange } 
              label='U.S. State (if applicable)'
              options={StateOptions}
            />
          </Form.Group>
          
          <Form.Field
              name='company'
              control={Input}
              onChange={ this.handleChange } 
              label='Health System/Company/Organization Affiliations'
          />     
          
          <Form.Field
              name='ethnicity'
              control={Select}
              onChange={ this.handleChange } 
              label='As part of our commitment to making NurseHack4Health more inclusive, please share your preferred Race/Ethnicity identification.'
              options={EthnicityOptions}
          />
            
          <Form.Field
              name='expertise'
              control={Select}
              onChange={ this.handleChange } 
              label='How would you classify your primary area of expertise?'
              options={ExpertiseOptions}
          />           
          
          <Form.Group inline>
            <label>Are you a recent graduate [under 2yrs], nursing student or currently enrolled in a nursing program?</label>
            <Form.Field
              name='student'
              control={Checkbox}
              onChange={ this.handleChange } 
              label='Yes'
            />
          </Form.Group>
                
          <br></br><br></br>
          <Button onClick={this.handleSubmit} disabled={this.state.optin} type='submit'>Register</Button>

        </Form>
      </div>
    )
  }
}

export default RegForm;