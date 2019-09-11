var express = require('express');
var router = express.Router();

var userRouter = require('./users');
var articleRouter = require('./articles');
var commentRouter = require('./comments');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/comments', commentRouter);

module.exports = router;