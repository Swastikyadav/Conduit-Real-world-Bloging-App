# Real-world-Conduit-API - Documentation
A real world blog app. A clone of Medium. 

## Authentication
```POST /api/users/login```
<br/>

## Registration
```POST /api/users```
<br/>

## Get Current User
```GET api/user```
<br/>

## Update User
```PUT api/user```
<br/>

## GET Profile
```GET /api/profiles/:username```
<br/>

## Follow User
```POST /api/profiles/:username/follow```
<br/>

## Unfollow User
```DELETE /api/profiles/:username/follow```
<br/>

## List Articles
```GET /api/articles```
<br/>

## Feed Articles
```GET /api/articles/feed```
<br/>

## Get Article
```GET /api/articles/:slug```
<br/>

## Create Article
```POST /api/articles```
<br/>

## Update Article
```PUT /api/articles/:slug```
<br/>

## Delete Article
```DELETE /api/articles/:slug```
<br/>

## Add Comments to an Article
```POST /api/articles/:slug/comments```
<br/>

## Get Comment from an article
```GET /api/articles/:slug/comments```
<br/>

## Delete Comment
```DELETE /api/articles/:slug/comments/:id```
<br/>

## Favorite Article
```POST /api/articles/:slug/favorite```
<br/>

## Unfavorite Article
```DELETE /api/articles/:slug/favorite```
<br/>

## Get Tags
```GET /api/tags```