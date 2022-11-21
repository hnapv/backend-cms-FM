const InterestRateTable = require('../models/InterestRateTableModel');

const GetListInterestRate = async () => {
  const listInterestRate = await InterestRateTable.find()
  return listInterestRate
}

const getListInterestRateByTerm = async (Term) => {
  const getIRbyTerm = await InterestRateTable.find({
    Term: Term
  })
  return getIRbyTerm
}

const getListInterestRateByTermAndEffective = async (Term, EffectiveDate) => {
  const listInterestRate = await InterestRateTable.find({
    Term: Term,
    EffectiveDate: EffectiveDate
  })
  return listInterestRate
}

const insertInterestRate = async (data) => {
  const dataInsert = await InterestRateTable.create(data)
  return dataInsert
}

const getListInterestRateByInterestRateTableCode = async (InterestRateTableCode) => {
  const data = await InterestRateTable.find({
    InterestRateTableCode: InterestRateTableCode
  })
  return data;
}

module.exports = {
  getListInterestRateByTermAndEffective,
  getListInterestRateByTerm,
  insertInterestRate,
  getListInterestRateByInterestRateTableCode,
  GetListInterestRate
}