var express = require('express');
var User = require('../../models/User');
var jwt = require('jsonwebtoken');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// var mongoose = require('mongoose');
// var User = mongoose.model('User');

// Registration: /api/users
router.post('/', (req, res, next) => {
    req.body.profilePicture = "https://static.productionready.io/images/smiley-cyrus.jpg";
    User.create(req.body, (err, user) => {
        if(err) return res.json({success: false, err});
        return res.json({user});
    });
});

// Login: /api/users/login
router.post('/login', (req, res, next) => {
    var email = req.body.email;
    var pass = req.body.password;
    console.log(req.body);
    // Find uesr into database.
    User.findOne({email}, (err, user) => {
        if(err) return res.json({success: false, err});
        if(!user) return res.json({msg: "User not registered"});
        if(!user.validatePassword(pass)) return res.json({msg: "Invalid password"});
        // Generate token for user.
        var token = jwt.sign({userId: user._id}, process.env.secret);
        return res.json({user, token});
    });
});

router.use(authToken.verifyToken);

// Follow & Unfollow feature.
router.put('/follow/:userId', (req, res, next) => {
    var id = req.params.userId;
    User.findById(req.userid, (err, user) => {
        if(err) return res.json({msg: "Err while finding user to follow", err});
        if(user.following.includes(id)) {
            User.findByIdAndUpdate(req.userid, {$pull: {following: id}}, {new: true}, (err, updatedUser) => {
                if(err) return res.status(500).json({msg: "Err while updating following of user", err});
                var follow = user.following.length;
                return res.json({follow});
            });
        } else {
            User.findByIdAndUpdate(req.userid, {$push: {following: id}}, {new: true}, (err, updatedUser) => {
                if(err) return res.json({msg: "Err while updating following of user", err});
                var follow = user.following.length;
                return res.json({follow});
            });
        }
    });
});

module.exports = router;
