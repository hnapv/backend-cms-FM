const Contract = require("../models/ContractModel")

const CreateOrder = async(Data)=>{
    const createData = await Contract.create(Data)
    return createData
}

const getContractDetailByOrderNo = async(orderNo)=>{
    const data = await Contract.findOne({
        orderNo: orderNo
    })
    return data
}

const putAContract = async(filter,update)=>{
    const data = await Contract.findOneAndUpdate(filter,update)
    return data
}

const getListContracts = async()=>{
    const data = await Contract.find()
    return data
}

const getListContractsWithPaginate = async(limit,skip)=>{
    const data = await Contract.find().limit(limit).skip(skip).sort({orderNo:-1})
    return data
}

const getCountContracts = async()=>{
    const data = await Contract.countDocuments()
    return data
}

const getContractFilter = async(a)=>{
    const data = await Contract.find(a)
    return data
}

const getContractbyCustomerID = async(customerId)=>{
    const data = await Contract.find({
        customerId: customerId
    })
    return data
}

const contractAggregate = async(a)=>{
   const data =  Contract.aggregate(a)
   return data
}

module.exports= {
    CreateOrder,
    getContractDetailByOrderNo,
    putAContract,
    getListContracts,
    getContractbyCustomerID,
    getContractFilter,
    contractAggregate,
    getListContractsWithPaginate,
    getCountContracts
}