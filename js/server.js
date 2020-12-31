const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
var nodemailer = require('nodemailer');
const port = 5500;


//get example
app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/register.html",);
     });

//get example
app.get("/login",function(req,res){
res.sendFile(__dirname+"/login.html",);
  });

//listening to port 5500
app.listen(port);
console.log("listening....");