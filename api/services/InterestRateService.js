const InterestRateTable = require ('../models/InterestRateModel');

const GetListInterestRate = async()=>{
  const listInterestRate = await InterestRateTable.find()
  return listInterestRate
}

const getListInterestRateByTermAndEffective = async (term, effectiveDate) => {
  const listInterestRate = await InterestRateTable.find({
    term: term,
    effectiveDate: effectiveDate
})
return listInterestRate
}

const insertInterestRate = async (data) => {
  const dataInsert = await InterestRateTable.create(data)
  return dataInsert
}

const getListInterestRateByInterestRateTableCode = async(InterestRateTableCode)=>{
  const data = await InterestRateTable.find({
    InterestRateTableCode: InterestRateTableCode
  })
  return data;
}

module.exports = {
  getListInterestRateByTermAndEffective,
  insertInterestRate,
  getListInterestRateByInterestRateTableCode,
  GetListInterestRate
}