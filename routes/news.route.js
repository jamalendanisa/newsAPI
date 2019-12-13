module.exports = app => {
  const news = require("../controllers/news.controller.js");

  // Create a new News
  app.post("/news", news.create);

  // Retrieve all News
  app.get("/news", news.findAll);

  // Retrieve a single News with id
  app.get("/news/:id", news.findOne);

  // Update a News with id
  app.put("/news/:id", news.update);

  // Delete a News with id
  app.delete("/news/:id", news.delete);

};