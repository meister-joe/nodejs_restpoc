// index.js

/**
 * Required External Modules
 */

/**
 * App Variables
 */

const path = require("path");
var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;
const session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("/loginlanding",(req,res) => {
    res.render("login", { title: "Login" });
  });

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.post('/login', (req, res) => {
    var data = req.body;
    console.log(req.body.email);
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
    var output = JSON.stringify(data);
    //res.append('Content-Type', 'application/json');
     res.render('afterlogin', { title: 'Welcome' + req.body.email, email: req.body.email });
    // res.redirect('/afterlogin?email=' + req.body.email);
    // res.end(output);
  });

/**
 * Server Activation
 */


app.listen(port);
console.log('Application is started at port : ' + port);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname,"public")));



