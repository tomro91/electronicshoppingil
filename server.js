const express = require('express');
const app = express();
const {Client} = require('pg');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
var nodemailer = require('nodemailer');
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
app.use(express.static(__dirname));
const bcrypt = require('bcrypt');
var crypto=require('crypto');
const saltRounds = 2;
const port = 5500;


const client = new Client({
  user: "postgres",
  password: "Aa123456",
  host: "localhost",
  port: 5432,
  database: "postgres"
})



//======================== GET REQUESTS SECTION ========================//

//======================== GET REGISTER PAGE ========================//
app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/register.html",);
    });

//======================== GET LOGIN PAGE ========================//
app.get("/login",function(req,res){
 //if there is no cookies => go to login page
  if(req.cookies["id"]==undefined && req.cookies["password"]==undefined && req.cookies["email"]==undefined)
  res.sendFile(__dirname+"/login.html",);
   
  else
  // else there are cookies => go to dashboard
  res.redirect("/dashboard");
  
  });

  //======================== GET DASHBOARD PAGE ========================//
  app.get('/dashboard', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});

    //======================== GET FORGOT-PASSWORD PAGE ========================//
app.get("/forgotpassword",function(req,res){
  res.sendFile(__dirname+"/forgot-password.html",);
    });

//======================== GET USER-ALREADY-EXISTS PAGE ========================//
    app.get("/useralreadyexists",function(req,res){
      res.sendFile(__dirname+"/404useralreadyexists.html",);
        });
  
//======================== GET USER-NOT-FOUND PAGE ========================//
app.get("/usernotfound",function(req,res){
  res.sendFile(__dirname+"/usernotfound.html",);
    });
//======================== GET USER-NOT-FOUND-FORGOT PAGE ========================//
app.get("/usernotfoundforgot",function(req,res){
  res.sendFile(__dirname+"/usernotfoundForgot.html",);
    });

    //======================== GET PASSWORD-UPDATE PAGE ========================//
    app.get("/updatepassword",function(req,res){
      let userID=req.query.userID;
      res.cookie("Forget",userID,{maxAge:1*60*60*1000,httpOnly:true});
      res.sendFile(__dirname+"/update-password.html",);
      });
//======================== GET REQUESTS SECTION END ========================//


app.post("/signup",function(req,res){
  
  let firstname = req.body.FirstName;
  let lastname = req.body.LastName;
  let userSignUp=req.body.Email;
  let passSignUp=req.body.psw;
  let confirm=req.body.pswAgain;
  let promocodeForm = req.body.promo;

 
  client.query("SELECT email from users where email=$1",[userSignUp],
  (err, result) => {
    console.log(err, result);
    if(result.rowCount>0)
    res.redirect('/useralreadyexists');
    else
    {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(passSignUp,salt,(err, hash) => {
          if(promocodeForm!=""){
          client.query("INSERT INTO users(name, familyname, email,promocode, password)VALUES($1, $2, $3,$4, $5)",[firstname,lastname,userSignUp,promocodeForm,hash],
          (err, res) => {
            console.log(err, res);
          }
        );
     }
     else{
      client.query("INSERT INTO users(name, familyname, email, password)VALUES($1, $2, $3, $4)",[firstname,lastname,userSignUp,hash],
          (err, res) => {
            console.log(err, res);
          }
        );
     }
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rwzntm@gmail.com',
              pass: 'OrtBraude3112@'
            }
          });
                
                var mailOptions = {
                  from: 'rwzntm@gmail.com',
                  to: userSignUp,
                  subject: "your registration was successfully",
                  text: "your registration details are:\n email:\n"+userSignUp + "\npassword:\n"+passSignUp
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    res.redirect("/login");
                    console.log('Email sent: ' + info.response);
                  }
              });
    });//hash
});//salt
}//else
});//select mail
});


    app.post("/login",function(req,res){

      let mailLogin=req.body.email;
      let passLogin=req.body.passw;
      let rememberOn=req.body.checkBox;

    client.query("SELECT email,password,id from users where email=$1",[mailLogin],
     (err, result) => {
      console.log(err, result);
     if(result.rowCount>0){
       bcrypt.compare(passLogin, result.rows[0]["password"], function(err, result1) {
         if (result1 == true) 
         {
           if(rememberOn=="on"){
             //remember me for one day
            res.cookie("id",result.rows[0].id,{maxAge:1*60*60*1000,httpOnly:true});
            res.cookie("email",result.rows[0].email,{maxAge:1*60*60*1000,httpOnly:true});
            res.cookie("password",result.rows[0].password,{maxAge:1*60*60*1000,httpOnly:true});
           }
           else if(rememberOn==undefined)
           {
             //do nothing
           }
          
          res.redirect("/dashboard");
         }
        
         else 
         res.redirect("/usernotfound");
      });
    
    }
    else
    res.redirect("/usernotfound");
  }
);
});

app.post("/updatePass",function(req,res){

  let psw=req.body.passwordUpdate;
  let pswAgain=req.body.passwordUpdateAgain;
  var userID=req.cookies['Forget'];
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(psw,salt,(err, hash) => {
      client.query("UPDATE users  SET password = $1   WHERE id = $2;",[hash,userID],
      (err, result) => {
        console.log(err);
        console.log("User with id "+userID+" updated successfully");
        client.query("SELECT email from users where id=$1",[userID],
       (err1, result1) => {
         console.log(err1);

         let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'rwzntm@gmail.com',
            pass: 'OrtBraude3112@'
          }
        });
              
              var mailOptions = {
                from: 'rwzntm@gmail.com',
                to: result1.rows[0].email,
                subject: "reseting password successfully",
                text: "your password reseted successfully"
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  res.redirect("/login");
                  console.log('Email sent: ' + info.response);
                }
            });

       
     });
      }
      )
    });
  });
 
  
}
  )

  
app.post("/forgotPass",function(req,res){
  let email = req.body.email;
  console.log("email is"+email);
  client.query("SELECT id from users where email=$1",[email],
     (err, result) => {
       console.log(result.rowCount);
      if(result.rowCount==0)
        res.redirect("/usernotfoundforgot");
      else{
        
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'rwzntm@gmail.com',
                  pass: 'OrtBraude3112@'
                }
              });
                    var userId=result.rows[0].id;
                    
                    var refere='http://localhost:5500/updatepassword?userID='+userId;
                    var mailOptions = {
                      from: 'rwzntm@gmail.com',
                      to: email,
                      subject: "'Reset your account password'",
                      html: '<h4><b>Reset Password</b></h4>' +
                           '<p>To reset your password, complete this form:</p>' +
                           '<a href= '+ refere+'>/http://localhost:5500/updatepassword/</a>'+
                          
                           '<br><br>' 
                      
                    
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        res.redirect("/login");
                        console.log('Email sent: ' + info.response);
                      }
                  });
      
      }
    
     });
});



//listening to port 5500
app.listen(port);
console.log("listening....");
client.connect()
.then(() => console.log("client Connected to database successfuly"))

