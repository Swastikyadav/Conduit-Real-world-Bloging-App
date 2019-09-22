var express = require('express');
var Tag = require('../../models/Tag');
var router = express.Router();

// Get Tags
router.get('/', (req, res, next) => {
    Tag.find({}, (err, tags) => {
        if(err) return res.json({success: false, err});
        if(!tags) return res.json({msg: "No tag found"});
        return res.json({tags});
    });
});

module.exports = router;