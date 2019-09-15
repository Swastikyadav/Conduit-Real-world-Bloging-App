var express = require('express');
var Article = require('../../models/Article');
var User = require('../../models/User');
var Comment = require('../../models/Comment');
var Tag = require('../../models/Tag');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// Read all articles.
router.get('/', (req, res, next) => {
    Article.find({}, (err, articles) => {
        if(err) return res.json({success: false, err});
        return res.json({articles});
    })
});

// Read single article.
router.get('/:slug', (req, res, next) => {
    var slug = req.params.slug;
    Article.findOne({slug}, (err, article) => {
        if(err) return res.json({success: false, err});
        return res.json({article});
    });
});

// // Get articles form tag.
// router.get('/tag/:tag', (req, res, next) => {
//     var tag = req.params.tag;
//     Tag.findOne({tagText: tag}, (err, tag) => {
//         if(err) return res.json({msg: "Err while finding tag", err});
//         var articleIdArr = tag.articleId;
//         var articleArr = [];
//         articleIdArr.forEach(e => {
//             Article.find({_id: e}, (err, article) => {
//                 if(err) return res.json({msg: "Err while finding articles by tag."});
//                 articleArr.push(article);
//                 articleArr.length == articleIdArr.length ? res.json({articleArr}) : "";
//             });
//         });
//     });
// });

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

// // Favourites - Article liking feature.
// router.put('/like/:articleId', (req, res, next) => {
//     var id = req.params.articleId;
//     Article.findById(id, (err, user) => {
//         if(err) return res.json({msg: "Err while finding article to like", err});
//         if(user.favourites.includes(req.userid)) {
//             Article.findByIdAndUpdate(id, {$pull: {favourites: req.userid}}, {new: true, upsert: true}, (err, updatedArticle) => {
//                 if(err) return res.json({msg: "Err while updating likes of article", err});
//                 var likes = user.favourites.length;
//                 return res.json({likes});
//             });
//         } else {
//             Article.findByIdAndUpdate(id, {$push: {favourites: req.userid}}, {new: true, upsert: true}, (err, updatedArticle) => {
//                 if(err) return res.json({msg: "Err while updating likes of article", err});
//                 var likes = user.favourites.length;
//                 return res.json({likes});
//             });
//         }
//     });
// });

// Articles by users you follow. Your Feed.
router.get('/following/feed', (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if(err) return res.json({success: false, err});
        user.following.forEach(e => {
            Article.find({userId: e}, (err, articles) => {
                console.log(articles);
                if(err) return res.json({success: false, err});
                return res.json({articles});
            });
        });
    });

    // Article.find({userId: {$in: user.following}})
});

module.exports = router;