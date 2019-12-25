const News = require("../models/news.model.js");
const moment = require("moment");

// Create and Save a new News
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

   // Create a News
  const news = new News({
    id: req.body.id,
    news_content : req.body.newsContent,
    date_from: req.body.dateFrom,
    date_to: req.body.dateTo,
    status: req.body.status,
    created_at: moment().format('YYYY-MM-DD hh:mm:ss')
  });

  // Save News in the database
  News.create(news, (err, data) => {
    if (err) {
      req.session.error = 'Error adding news. Please try again.';
      res.redirect('/addnews');
    }
    else { 
      delete req.session.error;
      if (data.id)
      req.session.newNewsId = parseInt(data.id) + 1;
      res.redirect('/addnews');
    }
  });
};
 
// Retrieve all News from the database.
exports.findAll = (req, res) => {
  News.getAll(req.query.page, req.query.limit, req.query.search, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    else { 
      if (data.rows.length !== 0)
        req.session.newNewsId = parseInt(data.rows[0].id) + 1;
      else
        req.session.newNewsId = 1;
      res.send(data);
    }
  });
};

// Find a single News with a id
exports.findOne = (req, res) => {
  News.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found News with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving News with id " + req.params.id
        });
      }
    } else { 
      req.session.newsOne = data
      res.send(data);
    }
  });
};

// Update a News identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  // Create a News Object
  let id = parseInt(req.params.id);
  const news = new News({
    id: id,
    news_content : req.body.newsContent,
    date_from: req.body.dateFrom,
    date_to: req.body.dateTo,
    status: req.body.status,
    updated_at: moment().format('YYYY-MM-DD hh:mm:ss')
  });

  News.updateById(
    id,
    news,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found News with id ${req.params.id}.`
          });
        } else {
          req.session.error = 'Error editing news. Please try again.';
          res.redirect('/addnews');
        }
      } else { 
          delete req.session.error;
          res.redirect('/cms'); 
      }
    }
  );
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
  News.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found News with id ${req.params.id}.`
        });
      } else {
        req.session.error = 'Error deleting news. Please try again.';
        res.send(data); 
      }
    } else {
      delete req.session.error;
      res.send(data); 
    } 
  });
};
