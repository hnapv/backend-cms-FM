var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var CusBankAccSchema= new Schema({
    customer_ObjId: { type: Schema.Types.ObjectId, ref: 'CustomerInfomation' },
    accountNumber: String,
    accountName: String,
    bankCode: String,
    bankShortName: String,
    bankName: String,
    bankBranch: String,
    status:String

}, {timestamps: true});

var CusBankAcc = mongoose.model("CusBankAcc",CusBankAccSchema);

module.exports = CusBankAcc;