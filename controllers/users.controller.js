const User = require("../models/users.model.js");

// Login User
exports.access = (req, res) => {
  User.findOne(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        req.session.error = 'User not found';
        res.redirect('/');
      } else {
        req.session.error = 'Error retrieving User. Please try again.';
        res.redirect('/');
      }
    } else {
      if (data.password !== Buffer.from(req.body.password).toString('base64')) {  
        req.session.error = 'Wrong password';
        res.redirect('/');
      } else {
        delete req.session.error;
        req.session.loggedin = true;
        req.session.username = data.username;
				res.redirect('/');
      }
    }
  });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

   // Create a User
  const user = new User({
    username : req.body.username,
    email: req.body.email,
    password: Buffer.from(req.body.password).toString('base64')
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};