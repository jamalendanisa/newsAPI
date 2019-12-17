const mysql = require("mysql");

// Use this config env to run this application locally
// const dbConfig = require("../config/db.config.js");
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// }); 

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
}); 

// Create a connection to the database
// const connection = mysql.createConnection({
//   host     : process.env.MYSQL_ADDON_HOST,
//   database : process.env.MYSQL_ADDON_DB,
//   user     : process.env.MYSQL_ADDON_USER,
//   password : process.env.MYSQL_ADDON_PASSWORD
// });

// open the MySQL connection and create database and table if doesn't exist
connection.connect(error => {
  if (error) throw error;

  let query;

  let createTableUser = `CREATE TABLE IF NOT EXISTS users(
    id INT primary key AUTO_INCREMENT,
    username VARCHAR(50) not null,
    email VARCHAR(100) not null,
    password VARCHAR(200) not null
  );`;
  
  let createTableNews = `CREATE TABLE IF NOT EXISTS news(
    id INT primary key,
    news_content TEXT not null,
    date_from DATETIME not null,
    date_to DATETIME not null,
    status TINYINT not null
  );`;

  let createFirstUser = `INSERT IGNORE INTO users(
    id, username, email, password) VALUES (
    1, 'idealump', 'idea@idealump.com', '${Buffer.from("idealump").toString('base64')}');`;

  connection.query(createTableNews, function(err, results, fields) {
    if (error) throw error;
  });

  connection.query(createTableUser, function(err, results, fields) {
    if (error) throw error;
  });

  connection.query(createFirstUser, function(err, results, fields) {
    if (error) throw error;
  });
});

module.exports = connection;
