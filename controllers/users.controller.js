const User = require("../models/users.model.js");

// Login User
exports.access = (req, res) => {
  console.log(req.body)
  User.findOne(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}. Login failed.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User. Login failed. " + req.body.email
        });
      }
    } else {
      if (data.password !== Buffer.from(req.body.password).toString('base64')) {
        res.status(400).send({
          message: "Wrong Password"
        });
      } else res.send(data);
    }
  });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
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