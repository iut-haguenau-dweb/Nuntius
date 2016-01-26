var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
    id: Number
    content: String
    time: Date
    user_id: Number
    conversation_id: Number
});

module.exports = mongoose.model('Message', MessageSchema);
