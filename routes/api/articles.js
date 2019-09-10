var express = require('express');
var Article = require('../../models/Article');
var User = require('../../models/User');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// Read all articles.
router.get('/', (req, res, next) => {
    Article.find({}, (err, articles) => {
        if(err) return res.json({msg: "Err while reading articles"});
        return res.json({articles});
    })
});

// Read single article.
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) return res.json({msg: "Err while reading single article", err});
        // Later: Find comments related to this perticular article.
        return res.json({article});
    });
});

// Only logged in user can access the routes below.
router.use(authToken.verifyToken);

// Creating newArticle.
router.post('/new', (req, res, next) => {
    req.body.userId = req.userid;
    // console.log(req.body);
    Article.create(req.body, (err, newArticle) => {
        if(err) return res.json({msg: "Err while creating new article", err});
        User.findOneAndUpdate({_id: newArticle.userId}, {$push: {articlesId: newArticle.id}}, {new: true, upsert: false}, (err, updatedUser) => {
            // console.log(updatedUser);
            if(err) return res.json({msg: "Err while updating user with array of article id", err});
            return res.json({msg: "User update successfull", newArticle});
        });
    });
});

// Update an existing article.
router.put('/update/:id', (req, res, next) => {
    var id = req.params.id;
    Article.findByIdAndUpdate(id, req.body, {new: true}, (err, updatedArticle) => {
        if(err) return res.json({msg: "Err while upadating article"});
        return res.json({updatedArticle});
    });
});

// Delete an article.
router.delete('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    Article.findByIdAndDelete(id, (err, deletedArticle) => {
        if(err) return res.json({msg: "Err while deleting article"});
        // Later: Also delete all comments related to this article.
        return res.json({msg: "Article deleted successfully"});
    });
});

module.exports = router;