// index.js

/**
 * Required External Modules
 */

/**
 * App Variables
 */

import { join } from "path";
import express, { static } from 'express';
var app = express();
var port = process.env.PORT || 8080;
import session from 'express-session';
import { urlencoded } from 'body-parser';
import fs from 'fs';

import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'System Integration - Health API',
      version: '0.0.8',
      description: 'DHL Information Services - Express System Integration Health API documentation. <br> <br>' +
        'Note! <br> __The APIs are for internal use only.__' +
        '<br> <br> ' +
        '**Steps to follow in order to test the APIs:** <br>' +
        ' 1. coming soon..<br>' +
        ' <br>'
    },
  },
  apis: ['./api/routes/*.js'],
};

const specs = swaggerJsdoc(options);


// Set Swagger API documentation
app.use('/api-docs', serve, setup(specs));
app.get('/api-docs.json', (req, res) => {  
  res.setHeader('Content-Type', 'application/json');  
  res.status(200).json(specs);  
}); 

/**
 *  App Configuration
 */

 /**
 * Routes Definitions
 */

import hwbRouter from './api/routes/housewaybill';
import sysInfoRouter from './api/routes/sysinfo';


app.use('/housewaybill', hwbRouter);
app.use('/sysinfo', sysInfoRouter);
app.get("/loginlanding",(req,res) => {
    res.render("login", { title: "Login" });
  });

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

  app.get("/afterlogin/:email", (req, res) => {
    var jsonStr=JSON.stringify(req.params);
    console.log(jsonStr);
    res.render('housewaybill', { 
      getUsername: function() {
        var dta=JSON.parse(jsonStr);
        return dta.email;
      }
  
  
  });
  });


app.use(urlencoded({ extended: true }));
app.post('/login', (req, res) => {
    var data = req.body;
    console.log(req.body.email);
    if (req.body.email=='')
    {
      res.append('Content-Type', 'application/json');
      res.send('please provide username and password');
    }
    else
    {
      console.log(req.body.email);
      if (req.body.password!='Welcome123')
      {
        res.append('Content-Type', 'text/plain');
        res.sendStatus(401);
      }
      else
      {
        app.use(session({
          key : req.body.email,
          secret : req.body.password,
          resave : true,
          saveUninitialized : true,
          cookie : {
            expires : 60000,
            httpOnly : true,
            path : '/login',
            secure : "auto",
            sameSite : true
          }
        }));
      // var output = JSON.stringify(data);
      //res.append('Content-Type', 'application/json');
      //  res.render('afterlogin', { title: 'Welcome ' + req.body.email, email: req.body.email });
      //  res.render('housewaybill', { title: 'Welcome ' + req.body.email, email: req.body.email });
      res.redirect('/afterlogin/' + req.body.email);
      // res.end(output);
    }
    
  }
  });

/**
 * Server Activation
 */

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");
app.use(static(join(__dirname,"public")));
app.listen(port);
console.log('Application is started at port : ' + port);





