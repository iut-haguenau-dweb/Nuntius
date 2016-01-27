var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConversationSchema   = new Schema({
    id: Number,
    user_one: Number,
    user_two: Number,
    user_three: Number,
    user_four: Number,
    time: Date
});

module.exports = mongoose.model('Conversation', ConversationSchema);
