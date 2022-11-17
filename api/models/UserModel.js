var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var UserSchema= new Schema ({
    FullName: String,
    UserName: String,
    Password: String,
    Email: String,
})

var User = mongoose.model("User",UserSchema)

module.exports= User;