function signInValidate() 
{ 
var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
var user = document.getElementById("exampleInputEmail").value;
var pass = document.getElementById("exampleInputPassword").value;
var userField = document.getElementById("exampleInputEmail");
var passField = document.getElementById("exampleInputPassword");
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


if(user=='')
{
    userField.focus();
    userField.title="user field is empty !!"
    return false;
}
if(pass=='')
{
    passField.focus();
    passField.title="password field is empty !!"
    return false;
}
if(!user.match(mailformat))
{
    userField.focus();
    userField.title="you entered invalid email\nformat need to be:\n[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@[a-zA-Z0-9-].[a-zA-Z0-9-]";
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
       return true;
}