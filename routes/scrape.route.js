module.exports = app => {
    const scrape = require("../controllers/scrape.controller.js");
    
    // Scraping Data from lumine.ne.jp
    app.get("/scrapedata", scrape.data);

    // Get Scraped Data 
    app.get("/datascraped", scrape.scraped);
  
  };  