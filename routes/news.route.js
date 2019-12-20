module.exports = app => {
  const news = require("../controllers/news.controller.js");
  const Cors = require('cors');

  // Create a new News
  app.post("/news", news.create);

  // Retrieve all News
  app.get("/news", Cors(), news.findAll);

  // Retrieve a single News with id
  app.get("/news/:id", news.findOne);

  // Update a News with id
  app.post("/news/:id", news.update);

  // Delete a News with id
  app.get("/delete/news/:id", news.delete);

};
