var express = require('express');
var User = require('../../models/User');
var jwt = require('jsonwebtoken');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// Registration
router.post('/register', (req, res, next) => {
    User.create(req.body, (err, newUser) => {
        if(err) return res.json(err);
        return res.json({newUser});
    });
});

// Login
router.post('/login', (req, res, next) => {
    var email = req.body.email;
    var pass = req.body.password;
    // Find uesr into database.
    User.findOne({email}, (err, user) => {
        if(err) return res.json({msg: "Err while finding user"});
        if(!user) return res.json({msg: "User not registered"});
        if(!user.validatePassword(pass)) return res.json({msg: "Invalid password"});
        // Generate token for user.
        var token = jwt.sign({userId: user._id}, process.env.secret);
        return res.json({token});
    });
});

router.use(authToken.verifyToken);

// Profile setting.
router.put('/profile-setting', (req, res, next) => {
    // User.update({_id: req.userid}, req.body, {upsert: true, runValidators: true}, (err, updatedUser) => {
    //     if(err) return res.json({msg: "Err while updating user's setting.", err});
    //     return res.json({msg: "User settings saved", updatedUser});
    // });
    User.findById(req.userid, (err, user) => {
        if(err) return res.json({msg: "Err while finding user to update profile", err});
        req.body.password ? user.password = req.body.password : "";
        req.body.username ? user.username = req.body.username : "";
        req.body.email ? user.email = req.body.email : "";
        req.body.bio ? user.bio = req.body.bio : "";
        req.body.profilePicture ? user.profilePicture = req.body.profilePicture : "";
        user.save((err, updatedUser) => {
            if(err) return res.json({msg: "Err while updating user's profile setting"});
            return res.json({msg: "User setting saved", updatedUser});
        })
    })
});

// Follow & Unfollow feature.
router.put('/follow/:userId', (req, res, next) => {
    var id = req.params.userId;
    User.findById(req.userid, (err, user) => {
        if(err) return res.json({msg: "Err while finding user to follow", err});
        if(user.following.includes(id)) {
            User.findByIdAndUpdate(req.userid, {$pull: {following: id}}, {new: true}, (err, updatedUser) => {
                if(err) return res.json({msg: "Err while updating following of user", err});
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
