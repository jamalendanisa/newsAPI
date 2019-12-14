# News API

## This is API Service for **News App**

### Login User
```
POST https://idealump-newsapi.cleverapps.io/login/
```
With data :
```
{ "email":"your@email.com",
  "password":"yourpassword"
}
```

### Logout
```
GET https://idealump-newsapi.cleverapps.io/logout/

```
### Create User
```
GET https://idealump-newsapi.cleverapps.io/users/
```
With data :
```
{ "username":"yourUsername",
  "email":"your@email.com",
  "password":"yourpassword"
}
```

### Retrieve All News
```
GET https://idealump-newsapi.cleverapps.io/news/?page={page}&limit={limit}
```

### Retrieve a single News with id
```
GET https://idealump-newsapi.cleverapps.io/news/:id
```

### Create a new News
```
POST https://idealump-newsapi.cleverapps.io/news/
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
PUT https://idealump-newsapi.cleverapps.io/news/:id
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
DELETE https://idealump-newsapi.cleverapps.io/news/:id
```

***The database's environment is for deployment on the cloud purpose. 
If you want to install it locally, please kindly set the database env to yours.***
