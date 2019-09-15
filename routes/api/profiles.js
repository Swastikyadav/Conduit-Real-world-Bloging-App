var express = require('express');
var authToken = require('../../modules/verifyToken');
var User = require('../../models/User');
var router = express.Router();

router.use(authToken.verifyToken);

// Get Profile
router.get('/:username', (req, res, next) => {
    var username = req.params.username;
    User.findOne({username}, (err, user) => {
        var following;
        if(user.following.length) {
            if(user.following.includes(user._id))
                following = true;
            else
                following = false;
        } else {
            following = false;
        }
        if(!user) return res.json({success: false, msg: "No user found"});
        var profile = {
            "username": user.username,
            "bio": user.bio,
            "image": user.profilePicture,
            "following": following
        }
        if(err) return res.json({success: false, err});
        return res.json({profile});
    }); 
});

// Follow User
router.post('/:username/follow', (req, res, next) => {
    var username = req.params.username;
    User.findOne({username}, (err, user) => {
        if(!user.followers.includes(req.userId)) {
            // Update other users followers array.
            User.findOneAndUpdate({username}, {$push: {followers: req.userId}}, {new: true}, (err, otherUser) => {
                if(err) return res.json({success: false, err});
                if(!otherUser) return res.json({success: false, msg: "No user found"});
                // Update current users following array.
                User.findByIdAndUpdate(req.userId, {$push: {following: otherUser._id}}, {new: true}, (err, currentUser) => {
                    if(err) return res.json({success: false, err});
                    if(!currentUser) return res.json({success: false, msg: "No user found"});
                    return res.json({otherUser, currentUser});
                });
            });
        } else {
            return res.json({user});
        }
    });
});

// UnFollow User
router.delete('/:username/follow', (req, res, next) => {
    var username = req.params.username;
    User.findOne({username}, (err, user) => {
        if(user.followers.includes(req.userId)) {
            // Update other users followers array.
            User.findOneAndUpdate({username}, {$pull: {followers: req.userId}}, {new: true}, (err, otherUser) => {
                if(err) return res.json({success: false, err});
                if(!otherUser) return res.json({success: false, msg: "No user found"});
                // Update current users following array.
                User.findByIdAndUpdate(req.userId, {$pull: {following: otherUser._id}}, {new: true}, (err, currentUser) => {
                    if(err) return res.json({success: false, err});
                    if(!currentUser) return res.json({success: false, msg: "No user found"});
                    return res.json({otherUser, currentUser});
                });
            });
        } else {
            return res.json({user});
        }
    });
});

module.exports = router;