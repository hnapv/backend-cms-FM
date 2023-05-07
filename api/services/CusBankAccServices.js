const CusBankAccModel = require("../models/CusBankAccModel")

const createCustomerBankAccount = async(data)=>{
    const createData = await CusBankAccModel.create(data)
    return createData
}

const changeCustomerBankAccount = async(filter,update)=>{
    const data = await CusBankAccModel.findOneAndUpdate(filter,update)
    return data
}

const getCustomerBankAccount =async(data)=>{
    const findData = await CusBankAccModel.find(data)
    return findData

}

module.exports={
    createCustomerBankAccount,
    changeCustomerBankAccount,
    getCustomerBankAccount
}