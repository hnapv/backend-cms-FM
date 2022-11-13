const InterestRateTable = require ('../models/InterestRateModel');

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

module.exports = {
  getListInterestRateByTermAndEffective,
  insertInterestRate
}