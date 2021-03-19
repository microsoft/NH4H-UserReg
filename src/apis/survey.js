import nh4h from './nh4h';

class Survey {
  static APIURL='/survey/';
  static USERID="UserId";
  static PRONOUN="Pronouns";
  static COUNTRY="Country";
  static USSTATE="State";
  static ETHNICITY="RaceEthnicity";
  static COMPANY="Company";
  static EXPERTISE="Expertise";
  static STUDENT="Student";
 
  userid;
  pronoun;
  country;
  usstate;
  company;
  ethnicity;
  expertise;
  student;

  constructor(){
    
  }

  updateSurvey=()=>{
  
//TODO: FIX API Error
    return    nh4h.post(Survey.APIURL, this.getSurveyBody())
        .catch(err => {
          console.error(err);
        });      
  }

  getSurveyBody=()=>{
    let body={};
    body[Survey.USERID]=this.userid;
    body[Survey.PRONOUN]=this.pronoun;
    body[Survey.COUNTRY]=this.country;
    body[Survey.USSTATE]=this.usstate;
    body[Survey.ETHNICITY]=this.company;
    body[Survey.COMPANY]=this.ethnicity;    
    body[Survey.EXPERTISE]=this.expertise
    body[Survey.STUDENT]=this.student
    
    return(body);
  }
    
}
export default Survey;