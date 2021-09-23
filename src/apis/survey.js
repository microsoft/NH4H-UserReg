import axios from "axios";

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
  nh4h;

  constructor(){
    
  }

  setAuthToken=(token)=>{
    this.nh4h = axios.create({
      baseURL: 'https://hackapi-v2.azurewebsites.net/api',
      headers: {
        common:{
          'content-type':'application/json',
        },
        'Authorization':`Bearer ${token}`,
      }
    });
  }

  updateSurvey=()=>{
  
//TODO: FIX API Error
    return    this.nh4h.post(Survey.APIURL, this.getSurveyBody())
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