const News = require("../models/news.model.js");

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
    status: req.body.status
  });

  // Save News in the database
  News.create(news, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    else res.send(data);
  });
};
 
// Retrieve all News from the database.
exports.findAll = (req, res) => {
  News.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    else res.send(data);
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
    } else res.send(data);
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
 
  // Create a News
  let id = parseInt(req.params.id);
  const news = new News({
    id: id,
    news_content : req.body.newsContent,
    date_from: req.body.dateFrom,
    date_to: req.body.dateTo,
    status: req.body.status
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
          res.status(500).send({
            message: "Error updating News with id " + req.params.id
          });
        }
      } else res.send(data);
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
        res.status(500).send({
          message: "Could not delete News with id " + req.params.id
        });
      }
    } else res.send({ message: "News was deleted successfully!" });
  });
};
