var express = require('express');
var Comment = require('../../models/Comment');
var Article = require('../../models/Article');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// Read comments with articleId.
router.get('/:articleId', (req, res, next) => {
    var id = req.params.articleId;
    Comment.find({articleId: id}, (err, comments) => {
        if(err) return res.json({msg: "Err while finding comments."});
        res.json({comments});
    });
});

router.use(authToken.verifyToken);

// Add comments.
router.post('/add/:articleId', (req, res, next) => {
    var id = req.params.articleId;
    req.body.userId = req.userid;
    req.body.articleId = id;
    console.log(req.body);
    Comment.create(req.body, (err, newComment) => {
        if(err) return res.json({msg: "Err while creating new comment.", err});
        Article.findByIdAndUpdate(newComment.articleId, {$push: {commentsId: newComment.id}}, {new: true, upsert: false}, (err, updatedUser) => {
            // console.log(updatedUser);
            if(err) return res.json({msg: "Err while updating article with array of comments id", err});
            return res.json({msg: "Article update successfull", newComment});
        });
    });
});

// Delete a comment.
router.delete('/delete/:commentId', (req, res, next) => {
    var id = req.params.commentId;
    var loggedUser = req.userid;
    // Only creator of comment can delete it.
    Comment.findById(id, (err, comment) => {
        if(err) return res.json({msg: "Err while finding comment", err});
        if(loggedUser == comment.userId) {
            Comment.findByIdAndDelete(id, (err, deletedComment) => {
                if(err) return res.json({msg: "Err while deleting comment."});
                return res.json({msg: "Comment deleted"});
            });
        } else {
            return res.json({msg: "You can't delete this comment"});
        }
    });
});

module.exports = router;