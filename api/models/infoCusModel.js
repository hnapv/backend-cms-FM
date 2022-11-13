var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var infoCusSchema= new Schema({
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
});

var infoCustomers = mongoose.model("infoCustomers",infoCusSchema);

module.exports = infoCustomers;