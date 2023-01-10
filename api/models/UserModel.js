var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userid:  {
        type: String,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    // role: {
    //     type: String,
    //     enum: ['O','A','SM','S']
    // }
})

var User = mongoose.model("User", UserSchema)

module.exports = User;