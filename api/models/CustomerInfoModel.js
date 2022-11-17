var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var CustomerInfoSchema= new Schema({
    fullName: String,
    id: String,
    dateOfIssue: Date,
    placeOfIssue: String,
    gender: {
        type: String,
        enum: ['male','female','other']
    },
    birthDay: Date,
    email: String,
    phoneNumber: Number,
    address: String    
}, {timestamps: true});

var CustomerInfomation = mongoose.model("CustomerInfomation",CustomerInfoSchema);

module.exports = CustomerInfomation;