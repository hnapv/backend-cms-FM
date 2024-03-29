const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ten, id, so tien, ky han, lai suat, loi tuc, tong thu nhap du kien, id nguoi tu van, ten nguoi tu van, so HD

const ContractSchema = new Schema({
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
  CustodyObjectID: { type: Schema.Types.ObjectId, ref: 'User' },
  CustodyID: String,
  CustodyFullName: String,
  ContractStatus: String,
  Creater: String,
  Approver: String

}, { timestamps: true })

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;