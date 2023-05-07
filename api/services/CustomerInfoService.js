const CustomerInfomation = require ("../models/CustomerInfoModel")

const GetListCustomerInfo = async(data)=>{
    const listCustomer = await CustomerInfomation.find(data)
    return listCustomer
}

const CreateCustomerInfo = async(data)=>{
    const createData = await CustomerInfomation.create(data)
    return createData
}


const GetDetailCusInfoByCustomerID = async (customerId)=>{
    const listCustomer = await CustomerInfomation.findOne({
        customerId: customerId
    })
    return listCustomer
}

const PutCustomerInfo = async(filter,updateInfo)=>{
    const updateCus = await CustomerInfomation.updateOne(filter,updateInfo)
    return updateCus
}


module.exports ={
    GetListCustomerInfo,
    CreateCustomerInfo,
    GetDetailCusInfoByCustomerID,
    PutCustomerInfo
}