const { createCustomerBankAccount, changeCustomerBankAccount, getCustomerBankAccount } = require('../services/CusBankAccServices');


const { VietQR } = require('vietqr');
const { GetListCustomerInfo } = require('../services/CustomerInfoService');
const { CHUA_DUYET, DA_DUYET } = require('../../config/params');

let vietQR = new VietQR({
    clientID: 'de8a0804-a76d-41e5-8ad6-31503ce7d5f4',
    apiKey: '17c29f09-4ea2-4417-b9c2-7f020d35de42',
});

const apiGetListBanks = async (req, res) => {
    try {
        const listBanks = await vietQR.getBanks()
        return res.status(200).send(listBanks.data)
    }
    catch (err) { return res.status(500).send(err.message) }
}

const apiAddCustomerBankAccount = async (req, res) => {
    const data = {
        customer_ObjId: req.body.customer_ObjId,
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        bankCode: req.body.bankCode,
        bankShortName: req.body.bankShortName,
        bankName: req.body.bankName,
        bankBranch: req.body.bankBranch,
        status:CHUA_DUYET
    }
    const customer = await GetListCustomerInfo({_id:data.customer_ObjId})
    if (customer.length == 0||customer.length>1) {
        return res.status(404).send({
            EC: -1,
            EM: "Có lỗi xảy ra!"
        })
    }
    if(!data.accountName||!data.accountNumber||!data.bankCode||!data.bankShortName||!data.bankName){
        return res.status(404).send({
            EC: -1,
            EM: "Trường thông tin bắt buộc!"  
        })
    }
    const createAcc = await createCustomerBankAccount(data)
    return res.status(200).send({
        EC:0,
        EM:0,
        DT: createAcc
    })
}

const apiApproveCustomerBankAccount = async(req,res)=>{
    const filter = {
        _id: req.body.id,
        status: CHUA_DUYET
    }

    const approve = {
        status: DA_DUYET,
        // approver: username
    }

    const approveContract = await changeCustomerBankAccount(filter, approve)
    if (approveContract === null) {
        return res.status(200).send('Thao tác thất bại')
    }
    return res.status(200).send(`Duyệt thành công!`)
}

const apiGetBankAccountByCustomer = async(req,res)=>{
    const data = await getCustomerBankAccount({customer_ObjId:req.params.customerId})
    console.log(req.params.customerId)
    return res.status(200).send(data)
}

module.exports = {
    apiGetListBanks,
    apiAddCustomerBankAccount,
    apiApproveCustomerBankAccount,
    apiGetBankAccountByCustomer
}