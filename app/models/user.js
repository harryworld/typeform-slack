var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    company: String,
    url: String
});

module.exports = mongoose.model('User', UserSchema);
