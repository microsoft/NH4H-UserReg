import axios from "axios";

class User {
  static APIURL='/users/';  
  static APICODEURL='/reglink/code';  
  static ROLE="userRole";
  static REGEMAIL="userRegEmail";
  static TEAMSEMAIL="UserMSTeamsEmail";
  static DISPLAYNAME="UserDisplayName";
  static TIMECOMMITMENT="UserTimeCommitment";
  static ACTIVE="Active";
  static SKILLS="tblUserSkillMatch";
  static OPTOUT="userOptOut";
  static SKILL="UserSkill";
  static MSFTOPTIN="MSFTOptIn";
  static JNJOPTIN="JNJOptIn";
  static SONSIELOPTIN="SONSIELOptIn";
    
 
  userid;
  email;
  displayname;
  role;
  mySkills;
  attemptedPreReg;
  active;
  optin;
  jnjnewsletter;
  sonsielnewsletter;
  msftnewsletter;
  nh4h;

  constructor(){
    this.userid=false;
    this.role="Preregistrant";
    this.active=false;
    this.attemptedPreReg=false;
    this.optin=false;
  }

  setAuthToken = (token) => {
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
  

  /**
    * sets user id, preregisters user if needed
    */
  getUserID = () => {
    let body = {};
    body[User.REGEMAIL] = this.email ;
    return this.nh4h.post(User.APIURL+'regemail', body)
      .then((response) => {
        
        if(response.data.returnError){            
//          console.log("Not preregistered");
          this.preRegister();     
        }else{
          this.userid= response.data.userId;
          this.mySkills= response.data[User.SKILLS];
//console.log("pre-reg role" + response.data[User.ROLE]);
          if(this.role==="Preregistrant"){
           this.role=response.data[User.ROLE];
          }//else role has been modified via an OTC and shouldn't be touched
          this.active=response.data['active'];
          this.displayname=response.data[User.DISPLAYNAME];
          this.optin=!response.data[User.OPTOUT];
        }
      });
  }
  /**
   * This is here for documentation purposes and won't be called b/c getting the userID auto-reregisters user
   */
  isPreregistered(){
    return this.userid?true:false;
  }

  preRegister=()=>{
    //circuit breaker to prevent infinite loops
    if(this.attemptedPreReg) {return;}      
      this.nh4h.post(User.APIURL, this.getUserBody())
      .then((response)=>{
        if(response.data.returnError){
          this.attemptedPreReg=true;
        }else{
          this.getUserID();
        }
      })
      .catch(err => {
        this.attemptedPreReg=true;
        console.error(err);
      });
      ;
  }

  updateUser=()=>{
    
        return this.nh4h.put(User.APIURL+this.userid, this.getUserBody())
            
            .catch(err => {
              
              console.error(err);
            });
  }

  checkCode=(otccode)=>{
     let body={
        UsedByEmail:this.email,
        UniqueCode:otccode
     };
    return this.nh4h.post(User.APICODEURL,body)
      .then((response)=>{
        if(!response.data.returnError){
//           console.log("Code valid. Role "+response.data);
            this.role=response.data;
        }
      })
  }

  getUserBody=()=>{
      let body={};
      body[User.REGEMAIL]=this.email;
      body[User.TEAMSEMAIL]=this.email;
      body[User.ROLE]=this.role;
      body[User.DISPLAYNAME]=this.displayname;
      body[User.OPTOUT]=this.optin;
      body[User.ACTIVE]=this.active;    
      body[User.JNJOPTIN]=this.jnjnewsletter
      body[User.SONSIELOPTIN]=this.sonsielnewsletter
      body[User.MSFTOPTIN]=this.msftnewsletter
      return(body);
  }
   
}
export default User;