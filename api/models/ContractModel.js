const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ten, id, so tien, ky han, lai suat, loi tuc, tong thu nhap du kien, id nguoi tu van, ten nguoi tu van, so HD

const ContractSchema = new Schema({
  bankAcc_ObjId: { type: Schema.Types.ObjectId, ref: 'CusBankAcc' },
  custody_ObjId: { type: Schema.Types.ObjectId, ref: 'User' },
  orderNo: String,
  customerName: String,
  customerId: String,
  investmentPrincipal: Number,
  orderDate: Date,
  term: String,
  maturityDate: Date,
  interestRate: Number,
  profit: Number,
  grossIncome: Number,
  bankAccountNumber: String,
  bankAccountName: String,
  bankCode: String,
  bankShortName: String,
  bankBranch: String,
  custodyId: String,
  custodyName: String,
  status: String,
  creater: String,
  approver: String

}, { timestamps: true })

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract;