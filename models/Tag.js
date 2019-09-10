var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    articleId: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Article'
    },
});

var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;