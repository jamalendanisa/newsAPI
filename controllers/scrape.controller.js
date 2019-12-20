const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');
const cheerio = require('cheerio');
const url = "http://www.lumine.ne.jp/ikebukuro/news/";

require('events').EventEmitter.prototype._maxListeners = 100;

const args = [
  '--no-sandbox',
]

// Scraping Data from lumine.ne.jp
exports.data = (req, res) => {
  (async () => {
  try {
    // Define browser
    const browser = await puppeteer.launch({ headless:true,  args : args });
    const page = await browser.newPage();
    
    // Function to crawl on urls
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      timeout: 500000,
      maxConcurrency: 30, 
    });
  
    await cluster.task(async ({ page, data: url }) => {
      await page.goto(url,  { timeout : 0, waitUntil: 'domcontentloaded' });
      const content = await page.$eval('.newsTxt', newsText => newsText.innerText.trim());
      return content;
    });
    
    // Error handling
    await cluster.on('taskerror', (err, data) => {
      return `Detail of ${data} is failed to loaded due to ${err.message}`
    });

    // Open Ikebukuro News
    await page.goto(url, { timeout : 0, waitUntil: 'domcontentloaded' });

    // Get Page HTML content
    const html = await page.waitForSelector('section[id="shop"] > a', {timeout : 0})
      .then(() => {return page.content()}).catch(console.error); 

    const $ = cheerio.load(html);
    const data = [];

    // Loop through links
    $('section[id="shop"] > a').each(async function () {      
      try {  
        let item = $(this);

        // Get all data items
        let image = 'http://www.lumine.ne.jp' + item.find(".topicsImg > img").attr('src');
        let title = item.find('.topicsInfo').children()[0].next.data.trim();
        let date = item.find('.date').text(); 
        let urlDetail = url + item.attr('href');
        let detail = await cluster.execute(urlDetail);
        
        if (detail == undefined || !!detail)
          detail = await cluster.execute(urlDetail);
    
        data.push({
          title : title,
          image: image,
          detail: detail,
          date : date
        });

      } catch (error) {
        console.log(error); 
      }
    });
    
    await browser.close();
    await cluster.idle();
    await cluster.close();
    
    res.send(data); 
  } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving data."
      });
    }
  })();
};
