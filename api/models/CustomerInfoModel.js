var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var CustomerInfoSchema= new Schema({
    customerName: String,
    customerId: String,
    dateOfIssue: Date,
    placeOfIssue: String,
    gender: {
        type: String,
        enum: ['male','female','other']
    },
    birthday: Date,
    email: String,
    phoneNumber: String,
    address: String    
}, {timestamps: true});

var CustomerInfomation = mongoose.model("CustomerInfomation",CustomerInfoSchema);

module.exports = CustomerInfomation;