const sql = require("./db.js");

// constructor
const News = function(news) {
  this.id = news.id;
  this.news_content = news.news_content;
  this.date_from = news.date_from;
  this.date_to = news.date_to;
  this.status = news.status
};

// Create a new News
News.create = (newNews, result) => {
  sql.query("INSERT INTO news SET ?", newNews, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created news: ", { id: res.insertId, ...newNews });
    result(null, { id: res.insertId, ...newNews });
  });
};

// Retrieve a single News with id
News.findById = (id, result) => {
  sql.query(`SELECT * FROM news WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found news: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found News with the id
    result({ kind: "not_found" }, null);
  });
};

// Retrieve all News
News.getAll = result => {
  sql.query("SELECT * FROM news", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("news: ", res);
    result(null, res);
  });
};

// Update a News with id
News.updateById = (id, news, result) => {
  sql.query(
    "UPDATE news SET ? WHERE id = ?",
    [news, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found News with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated news: ", { id: id, ...news });
      result(null, { id: id, ...news });
    }
  );
};

// Delete a News with id
News.remove = (id, result) => {
  sql.query("DELETE FROM news WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found News with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted news with id: ", id);
    result(null, res);
  });
};

module.exports = News;