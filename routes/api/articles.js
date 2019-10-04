var express = require('express');
var Article = require('../../models/Article');
var User = require('../../models/User');
var Comment = require('../../models/Comment');
var Tag = require('../../models/Tag');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// Read all articles.
router.get('/', (req, res, next) => {
    Article.find({}).populate("userId").exec((err, articles) => {
        if(err) return res.json({success: false, err});
        return res.json({articles});
    });
});

// Read single article.
router.get('/:slug', (req, res, next) => {
    var slug = req.params.slug;
    Article.findOne({slug}).populate('userId').populate('commentsId').exec((err, article) => {
        if(err) return res.json({success: false, err});
        return res.json({success: true, article});
    });
});

// Only logged in user can access the routes below.
router.use(authToken.verifyToken);

// Creating newArticle.
router.post('/', (req, res, next) => {
    req.body.userId = req.userId;
    Article.create(req.body, (err, newArticle) => {
        if(err) return res.json({msg: "Err while creating new article", err});
        // Creating Tags.
        if(newArticle.tag) {
            var tagArr = newArticle.tag.split(',');
            tagArr.forEach(e => {
                Tag.findOne({tagText: e.trim()}, (err, existingTag) => {
                    if(err) return res.json({msg: "Err while finding tag."});
                    if(!existingTag) {
                        Tag.create({articleId: [newArticle.id], tagText: e.trim()}, (err, tag) => {
                            if(err) return res.json({msg: "Err while creating tag."});
                        });
                    } else if(existingTag) {
                        Tag.findByIdAndUpdate(existingTag.id, {$push: {articleId: newArticle.id}}, {new: true}, (err, updatedTag) => {
                            if(err) return res.json({msg: "Err while updating tag."});
                        });
                    }
                });
            });
        };

        User.findOneAndUpdate({_id: newArticle.userId}, {$push: {articlesId: newArticle.id}}, {new: true, upsert: false}, (err, updatedUser) => {
            // console.log(updatedUser);
            if(err) return res.json({msg: "Err while updating user with array of article id", err});
            return res.json({msg: "User update successfull", newArticle});
        });
    });
});

// Update an existing article.
router.put('/:slug', (req, res, next) => {
    var slug = req.params.slug;
    var loggedInUser = req.userId;
    // Only creator can edit the article.
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        if(loggedInUser == article.userId) {
            Article.findOneAndUpdate({slug}, req.body, {new: true}, (err, updatedArticle) => {
                if(err) return res.json({success: false, err});
                return res.json({updatedArticle});
            });
        } else {
            return res.json({msg: "You can't edit this post"});
        }
    });
});

// Delete an article.
router.delete('/:slug', (req, res, next) => {
    var slug = req.params.slug;
    var loggedInUser = req.userId;
    // Only creator can delete the article.
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        if(!article) return res.json({msg: "No article found to delete"});
        if(loggedInUser == article.userId) {
            Article.findOneAndDelete({slug}, (err, deletedArticle) => {
                if(err) return res.json({success: false, err});
                // Also delete all comments related to this article.
                if(article.commentsId.length) {
                    Comment.find({articleId: article._id}, (err, comments) => {
                        if(err) return res.json({success: false, err});
                        if(comments.length) {
                            comments.forEach(e => {
                                Comment.findByIdAndDelete(e, (err, deletedComments) => {
                                    if(err) return res.json({success: false, err});
                                    return res.json({success: true});
                                });
                            });
                        } else {
                            return res.json({success: true, msg: "No comments to delete"});
                        }
                    });
                } else {
                    return res.json({success: true, msg: "No comments at all"});
                }
            });
        } else {
            return res.json({msg: "You can't delete this post"});
        }
    });
});

// Articles by users you follow. Your Feed.
router.get('/following/feed', (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if(err) return res.json({success: false, err});
        user.following.forEach(e => {
            Article.find({userId: e}).populate('userId').exec((err, articles) => {
                if(err) return res.json({success: false, err});
                return res.json({success: true, articles});
            });
        });
    });

    // Article.find({userId: {$in: user.following}})
});

// Add comments to an article.
router.post('/:slug/comments', (req, res, next) => {
    var slug = req.params.slug;
    req.body.userId = req.userId;
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        if(!article) return res.json({msg: "No article found"});
        req.body.articleId = article._id;

        Comment.create(req.body, (err, newComment) => {
            if(err) return res.json({success: false, err});
            Article.findByIdAndUpdate(newComment.articleId, {$push: {commentsId: newComment._id}}, {new: true, upsert: false}, (err, updatedUser) => {
                // console.log(updatedUser);
                if(err) return res.json({success: false, err});
                return res.json({success: true, newComment});
            });
        });
    });
});

// Get comments from article.
router.get('/:slug/comments', (req, res, next) => {
    var slug = req.params.slug;
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        if(!article) return res.json({msg: "No article found"});
        Comment.find({articleId: article._id}).populate('userId').exec((err, comments) => {
            if(err) return res.json({success: false, err});
            return res.json({comments});
        });
    });
});

// Delete a comment from an article.
router.delete('/:slug/comments/:id', (req, res, next) => {
    var slug = req.params.slug;
    var id = req.params.id;
    var loggedUser = req.userId;
    console.log(loggedUser);
    
    Comment.findById(id, (err, comment) => {
        if(err) return res.json({success: false, err});
        console.log(comment.userId);
        if(loggedUser == comment.userId) {
            Comment.findByIdAndDelete(id, (err, comment) => {
                if(err) return res.json({success: false, err});
                if(!comment) return res.json({msg: "No comment found"});
                Article.findOneAndUpdate({slug}, {$pull: {commentsId: id}}, {new: true}, (err, article) => {
                    if(err) return res.json({success: false, err});
                    return res.json({success: true});
                });
            });
        } else {
            return res.json({msg: "You can't delete this comment"});
        }
    })
}) ;

// Favourite Article.
router.post('/:slug/favorite', (req, res, next) => {
    var slug = req.params.slug;
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        if(!article) return res.json({msg: "No article found"});
        Article.findByIdAndUpdate(article._id, {$push: {favorites: req.userId}}, {new: true}, (err, updatedArticle) => {
            if(err) return res.json({success: false, err});
            User.findByIdAndUpdate(req.userId, {$push: {favorited: article._id}}, {new: true}, (err, updatedUser) => {
                if(err) return res.json({success: false, err});
                return res.json({success: true, updatedArticle, updatedUser});
            });
        });
    });
});

// UnFavorite an article.
router.delete('/:slug/favorite', (req, res, next) => {
    var slug = req.params.slug;
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        if(!article) return res.json({msg: "No article found"});
        Article.findByIdAndUpdate(article._id, {$pull: {favorites: req.userId}}, {new: true}, (err, updatedArticle) => {
            if(err) return res.json({success: false, err});
            User.findByIdAndUpdate(req.userId, {$pull: {favorited: article._id}}, {new: true}, (err, updatedUser) => {
                if(err) return res.json({success: false, err});
                return res.json({success: true, updatedArticle, updatedUser});
            });
        });
    });
});

module.exports = router;