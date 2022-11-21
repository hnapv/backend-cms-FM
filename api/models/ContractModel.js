var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ten, id, so tien, ky han, lai suat, loi tuc, tong thu nhap du kien, id nguoi tu van, ten nguoi tu van, so HD

var ContractSchema = new Schema({
    OrderNo: String,
    CustomerName: String,
    CustomerID: String,
    InvestmentPrincipal: Number,
    OrderDate: Date,
    Term: String,
    MaturityDate: Date,
    InterestRate: Number,
    Profit: Number,
    GrossIncome: Number,
    CustodyID: String,
    CustodyFullName: String,
    ContractStatus: String
}, { timestamps: true })

var Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;