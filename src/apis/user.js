import nh4h from './nh4h';

class User {
  static APIURL='/users/';  
  static ROLE="UserRole";
  static REGEMAIL="UserRegEmail";
  static TEAMSEMAIL="UserMSTeamsEmail";
  static DISPLAYNAME="UserDisplayName";
  static TIMECOMMITMENT="UserTimeCommitment";
  static ACTIVE="Active";
  static SKILLS="tblUserSkillMatch";
  static OPTOUT="UserOptOut";
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

  constructor(){
    this.userid=false;
    this.role="Preregistrant";
    this.active=false;
    this.attemptedPreReg=false;
    this.optin=false;
  }

  /**
    * sets user id, preregisters user if needed
    */
  getUserID = () => {
    let body = {};
    body[User.REGEMAIL] = this.email ;
    return nh4h.post(User.APIURL+'regemail', body)
      .then((response) => {
        console.log(response);
        if(response.data.returnError){            
          console.log("Not preregistered");
          this.preRegister();     
        }else{
          this.userid= response.data.userId;
          this.mySkills= response.data[User.SKILLS];
          this.role=response.data[User.ROLE];
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
      nh4h.post(User.APIURL, this.getUserBody())
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
    
        return    nh4h.put(User.APIURL+this.userid, this.getUserBody())
            
            .catch(err => {
              
              console.error(err);
            });
  }

  checkCode=()=>{
      nh4h.post(User.APIURL+'regmentor',{})
      .then((response)=>{
          console.log(response);
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