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
  
//TODO: Wire up to API    
//    return    nh4h.put(Survey.APIURL+this.userid, this.getSurveyBody())
//        .catch(err => {
//          console.error(err);
//        });      
  }

  getSurveyBody=()=>{
    let body={};
    /* This may ore may not be prop */ body[Survey.USERID]=this.userid;
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