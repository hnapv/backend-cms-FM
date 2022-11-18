var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

var User = mongoose.model("User", UserSchema)

module.exports = User;