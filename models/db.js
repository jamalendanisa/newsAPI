const mysql = require("mysql");

// Use this config env to run this application locally
const dbConfig = require("../config/db.config.js");
const pool = mysql.createPool({
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
// This instantiates the pool once, then exports a method named query.
// Now, when connection.query() is called anywhere, it calls this method, 
// which first grabs a connection from the pool, then passes the arguments to the connection. 
// It has the added effect of grabbing the callback first, so it can callback any errors 
// in grabbing a connection from the pool. https://stackoverflow.com/a/30914967

module.exports = {
  query: function(){
    let sql_args = [];
    let args = [];

    for(var i=0; i<arguments.length; i++){
      args.push(arguments[i]);
    }
    
    let callback = args[args.length-1]; //last arg is callback
    
    pool.getConnection(function(err, connection) {
      if(err) {
        console.log(err);
        return callback(err);
      }

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
        status TINYINT not null,
        created_at DATETIME,
        updated_at DATETIME
      );`;
        
      let createFirstUser = `INSERT IGNORE INTO users(
        id, username, email, password) VALUES (
        1, 'idealump', 'idea@idealump.com', '${Buffer.from("idealump").toString('base64')}');`;
        
      let createScrapeData = `CREATE TABLE IF NOT EXISTS scrape_data(id INT primary key, data LONGTEXT);`
        
      connection.query(createTableNews, function(error, results, fields) {
        if (error) throw error;
      });

      connection.query(createTableUser, function(error, results, fields) {
        if (error) throw error;
      });

      connection.query(createFirstUser, function(error, results, fields) {
        if (error) throw error;
      });

      connection.query(createScrapeData, function(error, results, fields) {
        if (error) throw error;
      });

      if(args.length > 2){
        sql_args = args[1];
      }

      connection.query(args[0], sql_args, function(err, results) {
        connection.release(); // always put connection back in pool after last query
        if(err){
          console.log(err);
          return callback(err);
        }
        callback(null, results);
      });
    });
  }
};
