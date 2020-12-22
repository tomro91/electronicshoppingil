const express = require('express');
const {Client} = require('pg');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
var nodemailer = require('nodemailer');
app.use(express.static(__dirname));
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

    //======================== GET REQUESTS SECTION END ========================//






//======================== POST REQUESTS SECTION ========================//

app.post("/signup",function(req,res){
  //======================== VARIABLES SECTION ========================//
  let firstname = req.body.FirstName;
  let lastname = req.body.LastName;
  let userSignUp=req.body.Email;
  let passSignUp=req.body.psw;
  let confirm=req.body.pswAgain;
  let promocodeForm = req.body.promo;
  //======================== VARIABLES SECTION END ========================//
 

//======================== VALIDATE USER IS ALREADY IN THE DATABASE SECTION ========================//
  client.query("SELECT * from users where email=$1",[userSignUp],
  (err, res) => {
    console.log(err, res);
    var mail = res.rowCount;
    console.log(mail);
  }
);

//======================== VALIDATE USER IS ALREADY IN THE DATABASE SECTION END ========================//


//======================== INSERT USER TO DATABASE UPON REGISTRATION SECTION ========================//
client.query("INSERT INTO users(name, familyname, email,promocode, password)VALUES($1, $2, $3,$4, crypt($5, gen_salt('md5')))",[firstname,lastname,userSignUp,promocodeForm,passSignUp],
  (err, res) => {
    console.log(err, res);
  }
);

//======================== INSERT USER TO DATABASE UPON REGISTRATION SECTION END ========================//












//======================== SENDING MAIL UPON REGISTRATION SECTION ========================//

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
    });

    //======================== SENDING MAIL SECTION END ========================//


    //validate that user is in database upon login
    app.post("/login",function(req,res){
      //======================== VARIABLES SECTION ========================//
      let mailLogin=req.body.email;
      let passLogin=req.body.passw;
      //======================== VARIABLES SECTION END ========================//
     
    //======================== VALIDATE USER IS IN DATABASE SECTION ========================//
    client.query("INSERT INTO users(name, familyname, email,promocode, password)VALUES($1, $2, $3,$4, crypt($5, gen_salt('md5')))",[firstname,lastname,userSignUp,promocodeForm,passSignUp],
      (err, res) => {
        console.log(err, res);
      }
    );
  }); 
    //======================== VALIDATE USER IS IN DATABASE SECTION END ========================//
    
    
    
    
    
    
    
    

        



























//======================== POST REQUESTS SECTION END ========================//

  





//listening to port 5500
app.listen(port);
console.log("listening....");
client.connect()
.then(() => console.log("Connected to database successfuly"))
