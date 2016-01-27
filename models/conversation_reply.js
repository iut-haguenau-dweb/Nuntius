var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Conversation_replySchema   = new Schema({
    id: Number
    content: String
    time: Date
    user_id: Number
    conversation_id: Number
});

module.exports = mongoose.model('Conversation_reply', Conversation_replySchema);
