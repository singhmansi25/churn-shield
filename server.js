require('dotenv').config();
const express = require("express");
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const { getMaxListeners } = require("process");
const ejs = require('ejs');
const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname));
app.use(express.static('./Contact/script_contact.js')); // Redirect Contact us JS
app.use(express.static('./Sign/script_sign.js')); // Redirect JS jQuery
// app.use('/js', express.static('./node_modules/powerbi-client/dist/')) // Redirect JS PowerBI
// app.use('/css', express.static('./node_modules/bootstrap/dist/css/')); // Redirect CSS bootstrap
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// start app with index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PWD,
    },
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
app.post("/send", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
      console.log(data);
      const mail = {
        sender: `${data.firstname} ${data.lastname} <${data.email}>`,
        to: process.env.RECEIVER, // receiver email,
        subject: 'Email from ChurnShield',
        text: `${data.firstname} ${data.lastname} <${data.email}> <${data.phone}> \n${data.message}`,
      };
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong. Please try again"});
        } else {
          res.status(200).json({ message: "Email successfully sent to recipient!\nWe will reach out to you soon."});
        }
      });
  });
});

// // Sign-up page
// app.post('/register', async (req, res) => {
//     try{
//         let foundUser = users.find((data) => req.body.email === data.email);
//         if (!foundUser) {
    
//             let hashPassword = await bcrypt.hash(req.body.password, 10);
    
//             let newUser = {
//                 id: Date.now(),
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: hashPassword,
//             };
//             users.push(newUser);
//             console.log(data)
//             console.log('User list', users);
    
//             res.write(
//               '<script>window.alert("Registration Successful. Redirecting to Login Page.");window.location="./Sign/Sign.html";</script>'
//             );
            
//         } else {
//             res.write(
//               '<script>window.alert("Email already used.");window.location="./Sign/Sign.html";</script>'
//             );
//         }
//     } catch{
//       res.sendFile(__dirname+"/internalerror.html");
//     }
//   });
  
//   // Login page
  
//   app.post('/login', async (req, res) => {
//     try{
//         let foundUser = users.find((data) => req.body.email === data.email);
//         if (foundUser) {
    
//             let submittedPass = req.body.password; 
//             let storedPass = foundUser.password; 
    
//             const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
//             if (passwordMatch) {
//                 let usrname = foundUser.username;
//                 res.write(
//                   '<script>window.alert("Log In Successful.");window.location="./index.html";</script>'
//                 );
//             } else {
//                 res.write(
//                   '<script>window.alert("Invalid Email or Password.");window.location="./Sign/Sign.html";</script>'
//                 );
//               }
//         }
//         else {
    
//             let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
//             await bcrypt.compare(req.body.password, fakePass);
            
//             res.write(
//               '<script>window.alert("Invalid Email or Password.");window.location="/Sign/Sign.html";</script>'
//             );
  
//             // res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
//         }
//     } catch{
//         res.sendFile(__dirname+"/internalerror.html");
//     }
//   });

  // Express server listening...
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });