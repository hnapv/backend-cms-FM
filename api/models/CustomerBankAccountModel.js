var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var CustomerBankAccountSchema= new Schema({
    customer_ObjId: { type: Schema.Types.ObjectId, ref: 'CustomerInfomation' },
    accountName: String,
    accountNumber: String,
    bankCode: String,
    bankShortName: String,
    bankName: String,
    bankBranch: String,

}, {timestamps: true});

var CustomerBankAccount = mongoose.model("CustomerBankAccount",CustomerBankAccountSchema);

module.exports = CustomerBankAccount;