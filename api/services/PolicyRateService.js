const PolicyRate = require("../models/PolicyRateModel/PolicyRateModel")
const RateTermPolicy = require("../models/PolicyRateModel/RateTermPolicyModel")


const createPolicyRate = async (data)=>{
    const insert = await PolicyRate.create(data)
    return insert
}

const insertRateTerm = async (data)=>{
    const insert = await RateTermPolicy.create(data)
    return insert
}

module.exports={
    createPolicyRate,
    insertRateTerm
}