const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const Cors = require("cors");
const basicAuth = require("express-basic-auth");
const session = require('express-session');
const swig = require('swig');
const moment = require('moment');

const app = express();

// session for basic auth
app.use(session({ 
  secret: 'Idea is Idealump',
  resave: true,
  saveUninitialized: true,
  //cookie: { maxAge: 6000 }
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

//basic authentication
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

// Swig Template
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// routing
app.get('/', function(req, res) {
  let message = '';

  if (req.session.loggedin) {
    res.render('home', {
      username: req.session.username,
    });
  } else {
    if(req.session.error) {
      message = req.session.error;
    }
    res.render('login', {message: message});
  }
});

app.get('/editnews/:id', function(req, res) {
  let message = '';
  let news = req.session.newsOne
  let page = 'edit';
 
  if (req.session.loggedin) {
    if(req.session.error) {
      message = req.session.error;
    }
    res.render('home', {
      username: req.session.username,
      page: page,
      news: news, 
      message: message, 
      today: moment().format('YYYY-MM-DD hh:mm:ss')
    });
  } else {
    if(req.session.error) {
      message = req.session.error;
    }
    res.render('login', {message: message});
  }
});

app.get('/addnews', function(req, res) {
  let message = '', newNewsId = '';
  let page = 'add';

  if (req.session.newNewsId) { 
    newNewsId = req.session.newNewsId
  }
    
  if (req.session.loggedin) {
    if(req.session.error) {
      message = req.session.error;
    }
    res.render('home', {
      username: req.session.username,
      newNewsId: newNewsId, 
      page: page,
      message: message, 
      today: moment().format('YYYY-MM-DD hh:mm:ss')
    });
  } else {
    if(req.session.error) {
      message = req.session.error;
    }
    res.render('login', {message: message});
  }
});

require("./routes/users.route.js")(app);
require("./routes/news.route.js")(app);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get("/logout", function (req, res) {
  delete req.session.authStatus;
  delete req.session.loggedin;
  delete req.session.username;
  delete req.session.newNewsId;

  res.render('login');
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
