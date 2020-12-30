var oldPasswordField= document.getElementById("inputOldPassword");
var newPasswordField= document.getElementById("inputNewPassword");
var confirmPasswordField= document.getElementById("inputConfirmPassword");
// When the user clicks on any of the password fields, show the message box
oldPasswordField.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
oldPasswordField.onblur = function() {
    document.getElementById("message").style.display = "none";
}

newPasswordField.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
newPasswordField.onblur = function() {
    document.getElementById("message").style.display = "none";
}

confirmPasswordField.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
confirmPasswordField.onblur = function() {
    document.getElementById("message").style.display = "none";
}
