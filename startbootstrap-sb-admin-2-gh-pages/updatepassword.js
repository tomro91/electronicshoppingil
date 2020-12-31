function UpdatePasswordValFunction(){

var pass = document.getElementById("passupdate").value;
var passField = document.getElementById("passupdate");
var passAgain = document.getElementById("passupdateagain").value;
var passAgainField = document.getElementById("passupdateagain");



if(pass=='')
{
    passField.focus();
    passField.title="password field is empty !!"
    return false;
}

    msgPassword="Invalid password:\n";
    var flag=true;
    if(pass.length<6)
    {
        msgPassword+="minimum of 6 letters\n"; 
        flag=false;
    }
     
    if(!pass.match(/[a-z]/g)){
        msgPassword+="Must contains lowercase letter\n"; 
        flag=false;
      
    }
    
    if(!pass.match(/[A-Z]/g)){
      msgPassword+="Must contains uppercase letter\n"; 
      flag=false;
    }
      if(!pass.match(/[0-9]/g))  {
      msgPassword+="Must contains at least one digit\n";
      flag=false;
      }
      if(!pass.match( /[^a-zA-Z\d]/g)){
      msgPassword+="Must contains at least one special key\n";
      flag=false;
      }
      if(!pass.match( /^[a-zA-Z0-9!@#\$%\^\&*\)\({\}+=.;:_-]+$/g)){
            msgPassword+="contains unsupported keys\nsupported keys are:! @ # $ % ^ & * ( ) - _ = + \ | [ ] { } ; : / ? . > <";
            flag=false;
            }
       if(flag==false){
        passField.focus();
        passField.title=msgPassword;
        
        return false;
          
       }
       if(pass!=passAgain){
                
        passField.title="passwords are not matched";
        passAgainField.focus();
        passAgainField.title="passwords are not matched";
       return false;
   }
       return true;




}