var express = require('express');
var User = require('../../models/User');
var jwt = require('jsonwebtoken');
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

module.exports = router;
