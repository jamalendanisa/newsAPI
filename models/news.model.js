const sql = require("./db.js");

// constructor
const News = function(news) {
  this.id = news.id;
  this.news_content = news.news_content;
  this.date_from = news.date_from;
  this.date_to = news.date_to;
  this.status = news.status;
  if(news.created_at)
  this.created_at = news.created_at;
  if(news.updated_at)
  this.updated_at = news.updated_at;
};

// Create a new News
News.create = (newNews, result) => {
  sql.query("INSERT INTO news SET ?", newNews, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

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
      result(null, res[0]);
      return;
    }

    // not found News with the id
    result({ kind: "not_found" }, null);
  });
};

// Retrieve all News
News.getAll = (page, limit, search, result)=> {
 
  // Check if there's query for pagination
  if(page == undefined || limit == undefined){
    page = '0';
    limit = '20'
  }
  page = parseInt(page);
  limit = parseInt(limit);

  let total, newsList;

  // Count total data in news table
  sql.query("SELECT count(*) AS total FROM news",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      total = res;
  });

  sql.query("SELECT * FROM news ORDER BY id DESC limit ? OFFSET ?",
  [limit, page],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    // If search something
    if (!!search) {
      sql.query([
        'SELECT *, count(*) OVER() as total FROM news',
        ' WHERE id LIKE "%'+search+'%"',
        ' OR date_from LIKE "%'+search+'%"',
        ' OR date_to LIKE "%'+search+'%"',
        ' OR news_content LIKE "%'+search+'%"',
        ' OR status LIKE "%'+search+'%" ORDER BY id DESC'
        ].join(''),
      (err, ressearch) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        let totalSearch = 0
        if(ressearch.length !== 0){
          totalSearch = ressearch[0].total
        }
        
        newsList = {
          total : totalSearch,
          rows : ressearch
        }

        result(null, newsList);
      });
    } else {
      newsList = {
        total : total[0].total,
        rows : res
      }
      result(null, newsList);
    }
  });
  return;
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

    result(null, res);
  });
};

module.exports = News;