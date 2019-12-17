const sql = require("./db.js");

const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

// Search if there is an user in User List
User.findOne = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      result(null, res[0]);
      return;
    }
    
    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};

// Create a new User
User.create = (user, result) => {
  sql.query("INSERT INTO users SET ?", user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...user });
  });
};

module.exports = User;