const express = require('express');
const {Client} = require('pg');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
var nodemailer = require('nodemailer');
app.use(express.static(__dirname));
const bcrypt = require('bcrypt');
const saltRounds = 2;
const port = 5500;
const client = new Client({
  user: "postgres",
  password: "Aa123456",
  host: "localhost",
  port: 5432,
  database: "postgres"
})

const client1 = new Client({
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
res.sendFile(__dirname+"/login.html",);
  });

  //======================== GET DASHBOARD PAGE ========================//
app.get("/dashboard",function(req,res){
  res.sendFile(__dirname+"/index.html",);
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
              pass: 'ExampleNode2011@'
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
  
    client.query("SELECT email,password from users where email=$1",[mailLogin],
     (err, result) => {
      console.log(err, result);
     if(result.rowCount>0){
       bcrypt.compare(passLogin, result.rows[0]["password"], function(err, result1) {
         if (result1 == true) 
         res.redirect("/dashboard");
         else 
         res.redirect("/usernotfound");
      });
    
    }
    else
    res.redirect("/usernotfound");
  }
);
}); 


  








  
//listening to port 5500
app.listen(port);
console.log("listening....");
client.connect()
.then(() => console.log("client Connected to database successfuly"))
client1.connect()
.then(() => console.log("client 1 Connected to database successfuly"))
