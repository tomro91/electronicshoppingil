
function RegisterValFunction(){
    //gets the email and password entered
    var firstNameField = document.getElementById("exampleFirstName");
    var lastNameField = document.getElementById("exampleLastName");
    var firstName = document.getElementById("exampleFirstName").value;
    var lastName = document.getElementById("exampleLastName").value;
    var emailField = document.getElementById("exampleInputEmail");
    var passwordField = document.getElementById("exampleInputPassword");
    var repasswordField = document.getElementById("exampleRepeatPassword");
    var email = document.getElementById("exampleInputEmail").value;
    var password = document.getElementById("exampleInputPassword").value;
    var secondPassword = document.getElementById("exampleRepeatPassword").value;
    var promoCode = document.getElementById("examplePromoCode").value;
    var promoCodeField = document.getElementById("examplePromoCode");
    //email validation
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  

    if(firstName=="")
    {
        firstNameField.focus();
        firstNameField.title="first name empty!!"  
        return false;
    }
    if(lastName=="")
    {
        lastNameField.focus();
        lastNameField.title="last name empty!!"  
        return false;
    }
    if(!email.match(mailformat))
    {
        emailField.focus();
        emailField.title="you entered invalid email\nformat need to be:\n[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@[a-zA-Z0-9-].[a-zA-Z0-9-]";
        return false;
    }
   
        msgPassword="Invalid password:\n";
        var flag=true;
        if(password.length<6)
        {
            msgPassword+="minimum of 6 letters\n"; 
            flag=false;
        }
         
        if(!password.match(/[a-z]/g)){
            msgPassword+="Must contains lowercase letter\n"; 
            flag=false;
          
        }
        
        if(!password.match(/[A-Z]/g)){
          msgPassword+="Must contains uppercase letter\n"; 
          flag=false;
        }
          if(!password.match(/[0-9]/g))  {
          msgPassword+="Must contains at least one digit\n";
          flag=false;
          }
          if(!password.match( /[^a-zA-Z\d]/g)){
          msgPassword+="Must contains at least one special key\n";
          flag=false;
          }
          if(!password.match( /^[a-zA-Z0-9!@#\$%\^\&*\)\({\}+=.;:_-]+$/g)){
                msgPassword+="contains unsupported keys\nsupported keys are:! @ # $ % ^ & * ( ) - _ = + \ | [ ] { } ; : / ? . > <";
                flag=false;
                }
           if(flag==false){
            passwordField.focus();
            passwordField.title=msgPassword;
            
            return false;
              
           }
           
           if(password!=secondPassword){
                
                passwordField.title="passwords are not matched";
                repasswordField.focus();
                repasswordField.title="passwords are not matched";
               return false;
           }

           if(promoCode=="")
           {
               promoCodeField.focus();
               promoCodeField.title="promoCode field empty!!"  
               return false;
           }
       
           if(!promoCode.match("3XCRt")&&!promoCode.match("4DFG")&&!promoCode.match("6DSQW"))
           {
               promoCodeField.focus();
               promoCodeField.title="invalid promo code!!"  
               return false;
           }
                    
          return true;
        
    }