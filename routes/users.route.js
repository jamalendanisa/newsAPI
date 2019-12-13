module.exports = app => {
  const users = require("../controllers/users.controller.js");
  
  // Login User
  app.post("/login", users.access);

  // Create a new User
  app.post("/users", users.create);
};  