var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    id: Number,
    name: String
});

module.exports = mongoose.model('Contact', ContactSchema);
