var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag'
    },
    commentsId: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;