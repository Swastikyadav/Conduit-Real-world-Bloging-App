var express = require('express');
var router = express.Router();

var usersRouter = require('./users');
var userRouter = require('./user');
var profileRouter = require('./profiles');
var articleRouter = require('./articles');
var commentRouter = require('./comments');

router.use('/users', usersRouter);
router.use('/user', userRouter);
router.use('/profiles', profileRouter);
router.use('/articles', articleRouter);
router.use('/comments', commentRouter);

module.exports = router;