function ForgotPasswordValFunction(){
    //gets the email and password entered
    
    var emailField = document.getElementById("exampleInputEmail");
    var email = document.getElementById("exampleInputEmail").value;
    //email validation
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(mailformat))
    {
        emailField.focus();
        emailField.title="you entered invalid email\nformat need to be:\n[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@[a-zA-Z0-9-].[a-zA-Z0-9-]";
        return false;
    }
}