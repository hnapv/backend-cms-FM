const CustomerInfomation = require ("../models/CustomerInfoModel")

const GetListCustomerInfo = async()=>{
    const listCustomer = await CustomerInfomation.find()
    return listCustomer
}

const CreateCustomerInfo = async(data)=>{
    const createData = await CustomerInfomation.create(data)
    return createData
}

const GetListCustomerInfoByCustomerID = async (CustomerID)=>{
    const listCustomer = await CustomerInfomation.find({
        CustomerID: CustomerID
    })
    return listCustomer
}

const GetACustomerInfoByCustomerID = async (CustomerID)=>{
    const listCustomer = await CustomerInfomation.findOne({
        CustomerID: CustomerID
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
    GetListCustomerInfoByCustomerID,
    GetACustomerInfoByCustomerID,
    PutCustomerInfo
}