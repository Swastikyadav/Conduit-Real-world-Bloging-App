# Real-world-Conduit-API - Documentation
A real world blog app. A clone of Medium. 

## Users Routes

### Registration & LogIn
Register - api/users/register (post request)
LogIn - api/users/login (post request)

### Profile Setting
Profile setting - api/users/profile-setting (put request)

### Follow & UnFollow
Follow & UnFollow - api/users/follow/:userId (put request)

## Articles Routes

### Read articles
Read all articles - api/articles (get request)
Read single article - api/articles/:articleId (get request)
Read article by tag - api/articles/tag/:tag (get request)

### Crud Operation on Article
Create new article - api/articles/new (post request)
Update an existing article - api/articles/update/:articleId (put request)
Delete an article - api/articles/delete/:articleId (delete request)

### Favourite / Like an Article
Favourite & UnFavourite an article - api/articles/like/:articleId (put request)

### Your Feed - Articles of users you follow
Your Feed - api/articles/following/feed (get request)

## Comments Routes

### Read Comments
Read comments with articleId - api/comments/:articleId (get request)
Add new comment to an article - api/comments/add/:articleId (post request)
Delete Comments of an article - api/comments/delete/:commentId (delete request)

Author - Swastik Yadav.