var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var CustomerInfoSchema= new Schema({
    CustomerName: String,
    CustomerID: String,
    DateOfIssue: Date,
    PlaceOfIssue: String,
    Gender: {
        type: String,
        enum: ['male','female','other']
    },
    BirthDay: Date,
    Email: String,
    PhoneNumber: Number,
    Address: String    
}, {timestamps: true});

var CustomerInfomation = mongoose.model("CustomerInfomation",CustomerInfoSchema);

module.exports = CustomerInfomation;