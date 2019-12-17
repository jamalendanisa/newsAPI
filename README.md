# CMS News

## This is Client and API Service for **CMS News App**

## Client Side

### Login User
```
 https://idealump-news.cleverapps.io/
```
Login with data :
```
{ "email":"your@email.com",
  "password":"yourpassword"
}
```

### NEWS LIST
```
 https://idealump-news.cleverapps.io/
```

### ADD NEWS
```
 https://idealump-news.cleverapps.io/addnews
```

### EDIT NEWS
```
 https://idealump-news.cleverapps.io/editnews/:id
```

### DELETE NEWS
```
DELETE NEWS https://idealump-news.cleverapps.io/delete/news/:id
```


## API Services

### Login User
```
POST https://idealump-news.cleverapps.io/login/
```
With data :
```
{ "email":"your@email.com",
  "password":"yourpassword"
}
```

### Logout
```
GET https://idealump-news.cleverapps.io/logout/

```

### Create User
```
POST https://idealump-news.cleverapps.io/users/
```
With data :
```
{ "username":"yourUsername",
  "email":"your@email.com",
  "password":"yourpassword"
}
```

### Retrieve News
```
GET https://idealump-news.cleverapps.io/news/?limit=?&page=?&search=?
```

### Retrieve a News with id
```
GET https://idealump-news.cleverapps.io/news/:id
```

### Create a new News
```
POST https://idealump-news.cleverapps.io/news/
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

### Update a News with id
```
POST https://idealump-news.cleverapps.io/news/:id
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

### Delete a News with id
```
GET https://idealump-news.cleverapps.io/delete/news/:id
```

***The database's environment is for deployment on the cloud purpose. 
If you want to install it locally, please kindly set the database env to yours.***
