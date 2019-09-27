var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    bio: String,
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    articlesId: {
        type: [Schema.Types.ObjectId],
        ref: 'Article'
    },
    commentsId: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    }
});

// Hash password for new user while registering.
userSchema.pre('save', function(next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

// Hash password while comparing at the time of login.
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;