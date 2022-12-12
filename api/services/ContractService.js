const Contract = require("../models/ContractModel")

const CreateOrder = async(Data)=>{
    const createData = await Contract.create(Data)
    return createData
}

const getContractDetailByOrderNo = async(OrderNo)=>{
    const data = await Contract.findOne({
        OrderNo: OrderNo
    })
    return data
}

const getListContract = async()=>{
    const data = await Contract.find()
    return data
}

const getContractbyCustomerID = async(CustomerID)=>{
    const data = await Contract.find({
        CustomerID: CustomerID
    })
    return data
}

module.exports= {
    CreateOrder,
    getContractDetailByOrderNo,
    getListContract,
    getContractbyCustomerID
}