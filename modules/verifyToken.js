var jwt = require('jsonwebtoken');

// Verifying token.
exports.verifyToken = function(req, res, next) {
    let token = req.headers.authorization || "";
    if(token) {
        jwt.verify(token, process.env.secret, function(err, decoded) {
            if(err) return res.json(err);
            req.userid = decoded.userId;
            console.log(req.userid);
            next();
        });
    } else {
        return res.json({msg: "User not logged in"});
    }
}