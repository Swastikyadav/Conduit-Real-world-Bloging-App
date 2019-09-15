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