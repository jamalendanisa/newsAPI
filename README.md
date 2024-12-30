## Front Page
#### Using React.js Redux Saga
```
jamalendanisa.github.io
```
Login :
```
{ "username":"idealump",
  "password":"idealump"
}
```

```
Front End Code
https://github.com/jamalendanisa/idealump-news
```
### Sections

#### Weather API
This Weather API using [Open Weather API](https://openweathermap.org/)

#### Map API
This Map API using [React Leaflet](https://react-leaflet.js.org/) and Tiles from [MapBox](https://www.mapbox.com/)

#### Scraping
The scrapping function is using [Puppeteer](https://github.com/puppeteer/puppeteer) and [Cheerio](https://cheerio.js.org/)

#### CMS News
The data are form CMS side



## CMS

### Client Side

#### Login User
```
/cms
```
Login with data :
```
{ "email":"idea@idealump.com",
  "password":"idealump"
}
```

#### NEWS LIST
```
/cms
```

#### ADD NEWS
```
/addnews
```

#### EDIT NEWS
```
/editnews/:id
```

#### DELETE NEWS
```
/delete/news/:id
```


### API Services

#### Login User
```
POST /login/
```
With data :
```
{ "email":"your@email.com",
  "password":"yourpassword"
}
```

#### Logout
```
GET /logout/

```

#### Create User
```
POST /users/
```
With data :
```
{ "username":"yourUsername",
  "email":"your@email.com",
  "password":"yourpassword"
}
```

#### Retrieve News
```
GET /news/?limit=?&page=?&search=?
```

#### Retrieve a News with id
```
GET /news/:id
```

#### Create a new News
```
POST /news/
```
With data :
```
{ "id":"1",
  "news_content":"This is news' content",
  "date_from":"2019-12-19 08:07:22",
  "date_to":"2019-12-29 08:07:22",
  "status":"0"
}
```

#### Update a News with id
```
POST /news/:id
```
With data :
```
{ "id":"1",
  "news_content":"This is news' content",
  "date_from":"2019-12-19 08:07:22",
  "date_to":"2019-12-29 08:07:22",
  "status":"0"
}
```

#### Delete a News with id
```
GET /delete/news/:id
```

#### Run Data scraping
The scraping function is automaticaly run everyday at 12AM but could be manually triggered using this link
```
GET /scrapedata
```

#### Get Scraped Data
```
GET /datascraped
```


***The database's environment is for deployment on the cloud purpose. 
If you want to install it locally, please kindly set the database env to yours.***
