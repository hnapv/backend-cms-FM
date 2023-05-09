const ContractService = require("../services/ContractService");
const CustomerInfoService = require("../services/CustomerInfoService")
const UserService = require("../services/UserService")
const UpperLevelMgtService = require("../services/UpperLevelMgtService")
const HolidayService = require("../services/HolidayService")
const PolicyRateService = require("../services/PolicyRateService");

const _ = require("lodash");
const { findApplicablePolicy, findWorkDayAfter } = require("../../utils/utils");
const { DA_DUYET, CHUA_DUYET } = require("../../config/params");

const LoginUserInfo = async (a) => {
    const user = await UserService.GetUserById(a)
    return (user)
}

const apiGetListContracts = async (req, res) => {
    const data = await ContractService.getListContracts()
    res.status(200).send(data)
}

const apiGetContractPaginate = async (req, res) => {
    try {

        const limit = +req.query.limit
        const page = +req.query.page
        const data = await ContractService.getListContractsWithPaginate(limit, limit * (+page - 1))
        const totalContracts = await ContractService.getCountContracts()
        res.status(200).send({
            DT: {
                page: page,
                totalRows: totalContracts,
                totalPages: Math.ceil(+totalContracts / limit),
                data: data
            },
            EC: 0,
            EM: "Get success"
        })
    }
    catch (err) {
        console.log(err + "")
        return res.status(200).send(
            {
                EC: -1,
                EM: err.message
            })
    }
}

const apiGetMaturityDate = async (req,res)=>{
    const getListHoliday = await HolidayService.GetListHolidayDate({ active: true })

    const termMonth = Number(req.query.term.slice(0, req.query.term.length - 1))
    let maturityDate = new Date(req.query.orderDate)
    maturityDate = new Date(maturityDate.setMonth(maturityDate.getMonth() + termMonth))
    maturityDate = findWorkDayAfter(maturityDate, getListHoliday)

    return res.status(200).send({
        EC:0,
        EM: "Get success",
        DT: maturityDate
    })
}


//tao HĐ đầu tư
const apiCreateContract = async (req, res) => {
    try {

        const today = new Date()
        const CurrentDay = today.getDate()
        const CurrentMonth = today.getMonth() + 1
        const CurrentYear = today.getFullYear()

        //khoi tao so hd moi
        const listcontract = await ContractService.getListContracts()
        let startOrderNo = Math.max(...listcontract.map((data) => data.orderNo.split("/")[0])) + 1 
        if(startOrderNo<1){
            startOrderNo =1
        }
        console.log("check số hđ",startOrderNo)
        // const startOrderNo = 1
        const lengthPrefixOrderNo = 6
        const orderNo = `${('0000000000').slice(0, lengthPrefixOrderNo - startOrderNo.toString().length) + startOrderNo.toString()}/${CurrentYear}/HTDT/ANHVP`

        //lay thong tin KH
        const customerId = req.body.customerId
        const listCustomer = await CustomerInfoService.GetDetailCusInfoByCustomerID(customerId)
        console.log("check cusstomer id==>", customerId)
        if (listCustomer === null) {
            return res.status(404).send("Customer ID khong ton tai")
        }

        //lay thong tin ky han & lãi suất

        const orderDate = new Date(req.body.orderDate)
        console.log("check",orderDate.toLocaleDateString('vi-VN')) //check tiếp
        
        if (orderDate.getDay() == 0 | orderDate.getDay() == 6) {
            return res.status(500).send("Ngày đầu tư là ngày cuối tuần")
        }

        const getListHoliday = await HolidayService.GetListHolidayDate({ active: true })
        for (var i = 0; i < getListHoliday.length; i++) {
            if (orderDate.getTime() == getListHoliday[i].dateHoliday.getTime()) {
                return res.status(500).send("Ngày đầu tư là ngày nghỉ")
            }
        }

        const ListPolicyRate = await PolicyRateService.getListPolicyRate()
        const applicablePolicyRate = await findApplicablePolicy(ListPolicyRate, orderDate)
        const applicableRateTerm = await PolicyRateService.getRateTermByPolicyRateId({ policyRateObjId: applicablePolicyRate._id })

        const term = req.body.term
        const convertApplicableRateTerm = applicableRateTerm.filter(a => a.term === term)
        if (convertApplicableRateTerm.length == 0) {
            return res.status(404).send("Không tìm được biểu lãi suất")
        }

        const termMonth = Number(term.slice(0, term.length - 1))
        // const CurrentDate = new Date(`${CurrentYear}/${CurrentMonth}/${CurrentDay}`)

        let maturityDate = new Date(orderDate)
        maturityDate = new Date(maturityDate.setMonth(maturityDate.getMonth() + termMonth))

        maturityDate = findWorkDayAfter(maturityDate, getListHoliday)

        //tinh tien nhan
        const investmentPrincipal = req.body.investmentPrincipal
        if (!_.isInteger(investmentPrincipal)) {
            res.status(500).send('So tien khong hop le')
        }
        const holdingPeriod = (maturityDate - orderDate) / (1000 * 3600 * 24)
        const profit = Math.round(+investmentPrincipal * +convertApplicableRateTerm[0].rate / 100 * +holdingPeriod / 365)
        const grossIncome = investmentPrincipal + profit

        //lấy user tạo

        const creater = await LoginUserInfo(req.user)
        const { username, _id, userid, fullname } = creater

        const newContract = {
            custody_ObjId: _id,
            bankAcc_ObjId: req.body.bankAcc_ObjId,
            orderNo: orderNo,
            customerName: listCustomer.customerName,
            customerId: req.body.customerId,
            orderDate: orderDate,
            investmentPrincipal: investmentPrincipal,
            term: req.body.term,
            maturityDate: maturityDate,
            interestRate: convertApplicableRateTerm[0].rate,
            profit: profit,
            grossIncome: grossIncome,
            custodyId: userid,
            custodyName: fullname,
            status: CHUA_DUYET,
            creater: username,
            approver: null,
            bankAccountNumber: req.body.bankAccountNumber,
            bankAccountName: req.body.bankAccountName,
            bankCode: req.body.bankCode,
            bankShortName: req.body.bankShortName,
            bankBranch: req.body.bankBranch,
        }
        const createContract = await ContractService.CreateOrderContract(newContract)
        return res.status(200).send({
            EC: 0,
            EM: "Tạo HĐ thành công",
            DT: createContract
        })
    }
    catch (err) {
        console.log(err + "")
        return res.status(500).send(err.message)
    }
}

//approve HD
const apiApproveContract = async (req, res) => {

    //lấy user tạo

    const creater = await LoginUserInfo(req.user)
    console.log("LoginUserInfo=>", creater)
    const { username } = creater

    const filter = {
        orderNo: req.body.orderNo,
        status: CHUA_DUYET
    }

    const approve = {
        status: DA_DUYET,
        approver: username
    }

    const approveContract = await ContractService.putAContract(filter, approve)
    if (approveContract === null) {
        return res.send('Thao tác thất bại')
    }
    res.send(`Hợp đồng ${req.body.orderNo} đã duyệt thành công!`)
}

//xem chi tiet 1 HD
const apigetContractDetailByOrderNo = async (req, res) => {
    const orderNo = req.body.orderNo
    const data = await ContractService.getContractDetailByOrderNo(orderNo)
    console.log(data)
    res.send(data)
}

//xem hd theo KH
const apigetContractbyCustomerID = async (req, res) => {
    const customerId = req.body.customerId
    const data = await ContractService.getContractbyCustomerID(customerId)
    console.log("DS HĐ theo KH ==>", data)
    res.send(data)
}

const apigetContractFilter = async (req, res) => {

    const filter = {
        custodyId: {
            $in: [/^12/, "d"]
        },
        status: DA_DUYET
    }
    const getcontract = await ContractService.getContractFilter(filter)
    console.log(getcontract)
    res.status(200).json(getcontract)
}

const apigetContractAggregate = async (req, res) => {
    const userObjId = req.body.userObjId

    UpperLevelMgtService


    const pineline = [
        {
            $match:
            {
                status:
                {
                    $in: ["CHUA_DUYET", "DA_DUYET"]
                }
            }
        },
        {
            $group: {
                _id: { tenKH: "$customerName", CMT: "$customerId" },
                TongGT:
                {
                    $sum: {
                        "$toInt": "$investmentPrincipal"
                    }
                },
                SLHĐ: { $count: {} },
                TB:
                {
                    $avg: {
                        "$toInt": "$investmentPrincipal"
                    }
                },
                // $sort: { '_id.year': 1, '_id.month': 1 } 
            }
        }
    ]
    const getcontract = await ContractService.contractAggregate(pineline)
    console.table(getcontract)
    res.status(200).send(getcontract)
}

module.exports = {
    apiCreateContract,
    apiGetMaturityDate,
    apiApproveContract,
    apigetContractDetailByOrderNo,
    apigetContractbyCustomerID,
    apigetContractFilter,
    apigetContractAggregate,
    apiGetListContracts,
    apiGetContractPaginate
}
