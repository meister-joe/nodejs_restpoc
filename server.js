const path = require("path");
var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/userinfo', (req, res) => {
  if (req.query.username == 'juara') {
    res.end(req.query.username);
  }
  else {
    res.end("unknown user");
  }

});
app.listen(port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/loginlanding",(req,res) => {
  res.render("login", { title: "Login" });
});

console.log('RESTful API server started on: ' + port);

