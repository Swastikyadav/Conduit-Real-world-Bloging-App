var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlug = require('mongoose-url-slugs');

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
        type: String
        // ref: 'Tag'
    },
    // tags: [String],
    commentsId: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
});

articleSchema.plugin(URLSlug('title', {field: 'slug'}));

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;


