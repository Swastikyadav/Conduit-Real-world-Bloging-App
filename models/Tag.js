var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    articleId: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Article'
    },
    tagText: {
        type: String,
        required: true
    }
});

var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;