var express = require('express');
var authToken = require('../../modules/verifyToken');
var User = require('../../models/User');
var router = express.Router();

router.use(authToken.verifyToken);

// Get Current User.
router.get('/', (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if(err) return res.json({success: false, err});
        return res.json({user});
    });
});

// Update User Profile.
router.put('/', (req, res, next) => {
    // User.update({_id: req.userid}, req.body, {upsert: true, runValidators: true}, (err, updatedUser) => {
    //     if(err) return res.json({msg: "Err while updating user's setting.", err});
    //     return res.json({msg: "User settings saved", updatedUser});
    // });
    User.findById(req.userId, (err, user) => {
        if(err) return res.json({success: false, err});
        req.body.password ? user.password = req.body.password : "";
        req.body.username ? user.username = req.body.username : "";
        req.body.email ? user.email = req.body.email : "";
        req.body.bio ? user.bio = req.body.bio : "";
        req.body.profilePicture ? user.profilePicture = req.body.profilePicture : "";
        user.save((err, updatedUser) => {
            if(err) return res.json({success: false, err});
            return res.json({updatedUser});
        })
    })
});

module.exports = router;