const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const Cors = require("cors");
const basicAuth = require("express-basic-auth");
const session = require('express-session');

const app = express();

// session for basic logout
app.use(session({ 
  secret: 'Idea is Idealump',
  resave: true,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  if (!req.session.authStatus || 'loggedOut' === req.session.authStatus) {
    req.session.authStatus = 'loggingIn';

    // cause Express to issue 401 status so browser asks for authentication
    req.user = false;
    req.remoteUser = false;
    if (req.headers && req.headers.authorization) { delete req.headers.authorization; }
  }
  next();
});

// Login session
app.use(function (req, res, next) {
  req.session.authStatus = 'loggedIn';
  next();
});

// basic authentication
app.use(basicAuth({
  challenge: true,
  users: { 'idealump': 'idealump' },
  realm: 'Secret Area',
}));

// CORS Handle
app.use(Cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routing
require("./routes/users.route.js")(app);
require("./routes/news.route.js")(app);

app.get("/logout", function (req, res) {
  delete req.session.authStatus;
  res.send('You are now logged out.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status || 500).send(err);
});

module.exports = app;
