var express = require('express');
var router = express.Router();

var userRouter = require('./users');
var articleRouter = require('./articles');

router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;