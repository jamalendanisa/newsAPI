const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');
const cheerio = require('cheerio');
const cron = require('node-cron');
const url = "http://www.lumine.ne.jp/ikebukuro/news/";
const sql = require("../models/db.js");

require('events').EventEmitter.prototype._maxListeners = 100;

const args = [
  '--no-sandbox',
  "--proxy-server='direct://'",
  "--proxy-bypass-list=*"
]

// Scraping Data from lumine.ne.jp
exports.data = (req, res) => {
  console.log('function has been summoned');
  (async () => {
  try {
    // Define browser
    const timeout = 300000
    const browser = await puppeteer.launch({ headless:true,  args : args, timeout });
    cron.schedule('*/30 * * * *', async () => {
      console.log('time out 30 minutes');
      await browser.close();
    });
    const page = await browser.newPage();
    console.log('opening browser tab');

    // Function to crawl on urls
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      timeout: 500000,
      maxConcurrency: 15, 
    });
  
    await cluster.task(async ({ page, data: url }) => {
      await page.goto(url,  { timeout : 0, waitUntil: 'domcontentloaded' });
      console.log('detail page loaded')
    
      const content = await page.$eval('.c-block02-aticle', newsText => newsText.innerText.trim());
     
      return content;
    });
    
    // Error handling
    await cluster.on('taskerror', (err, data) => {
      return `Detail of ${data} is failed to loaded due to ${err.message}`
    });

    // Open Ikebukuro News
    await page.goto(url, { timeout : 0, waitUntil: 'domcontentloaded' });
    console.log('page loaded');

    // Get Page HTML content
    const html = await page.waitForSelector('li[class="c-card01--row4"] > a', {timeout : 0})
      .then(() => { console.log('page fully loaded');
        return page.content()
      }).catch(async()=>{
        await browser.close();
        console.erorr
      }); 

    const $ = cheerio.load(html);
    const data = [];

    // Loop through links
    $('li[class="c-card01--row4"] > a').each(async function () {      
      try {  
        let item = $(this);

        console.log('Get data items');
        // Get all data items
        let image = item.find(".c-img01 > img").attr('src');
        let title = item.find('.c-card01__txt02').text();
        let date = item.find('.c-card01__txt03').text(); 
        let urlDetail = 'http://www.lumine.ne.jp' + item.attr('href');
        
        let detail = await cluster.execute(urlDetail);
       
        if (detail == undefined) {
          console.log('failed get detail, catch again!');
          detail = await cluster.execute(urlDetail);
        }

        data.push({
          title : title,
          image: image,
          detail: detail,
          date : date
        });
         
      } catch (error) {
        console.log('scraping data failed, catch again!');
        console.log(error); 
      }
    });
    
    await browser.close();
    await cluster.idle();
    await cluster.close();
    console.log('scraping data done!', data);
   
    let scrapedData = { id: 1, data: JSON.stringify(data)};

    sql.query(`SELECT * FROM scrape_data WHERE id = 1`, (err, response) => {
      if (err) {
        console.log("error: ", err);
        return;
      }

      if (response.length) {
        sql.query("UPDATE scrape_data SET ? WHERE id = 1",
          [scrapedData],
          (err, response) => {
            if (err) {
              console.log("error: ", err);
              return;
            }

            res.send('scraping data updated!');
            console.log('scraping data updated!');
        });
        return;
      }
    
    sql.query("INSERT INTO scrape_data SET ?", scrapedData, (err, response) => {
      if (err) {
        console.log("error: ", err);
        return;    
      }

      res.send('scraping data saved!');
      console.log('scraping data saved!');
    });
 });
  } catch (error) {
    //  this.data();
      console.log('scraping data failed, catch again!', error);
    }
  })();
};

exports.scraped  = (req, res) => {
  sql.query(`SELECT * FROM scrape_data`, (err, data) => {
    if (err)
      res.send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    else res.send(data);
  });
};