const ContractService = require("../services/ContractService");
const CustomerInfoService = require("../services/CustomerInfoService")
const UserService = require("../services/UserService")
const UpperLevelMgtService = require("../services/UpperLevelMgtService")
const HolidayService = require("../services/HolidayService")
const PolicyRateService = require("../services/PolicyRateService");

const _ = require("lodash");
const { findMinValueGreatEqual0InArray } = require("../../utils/utils");

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


//tao HĐ đầu tư
const apiCreateContract = async (req, res) => {
    try {

        const today = new Date()
        const CurrentDay = today.getDate()
        const CurrentMonth = today.getMonth() + 1
        const CurrentYear = today.getFullYear()

        //khoi tao so hd moi
        const listcontract = await ContractService.getListContracts()
        const PrefixOrderNo = (data) => data.OrderNo.split("/")[0]
        const startOrderNo = Math.max(...listcontract.map(PrefixOrderNo)) + 1
        const lengthPrefixOrderNo = 6
        const OrderNo = `${('0000000000').slice(0, lengthPrefixOrderNo - startOrderNo.toString().length) + startOrderNo.toString()}/${CurrentYear}/HTDT/ANHVP`

        //lay thong tin KH
        const CustomerID = req.body.CustomerID
        const listCustomer = await CustomerInfoService.GetDetailCusInfoByCustomerID(CustomerID)
        if (listCustomer === null) {
            return res.status(404).send("Customer ID khong ton tai")
        }

        //lay thong tin ky han & lãi suất

        const OrderDate = new Date(req.body.OrderDate)

        if (OrderDate.getDay() == 0 | OrderDate.getDay() == 6) {
            return res.status(500).send("Ngày đầu tư là ngày cuối tuần")
        }

        const getListHoliday = await HolidayService.GetListHolidayDate({ Active: true })
        for (var i = 0; i < getListHoliday.length; i++) {
            if (OrderDate.getTime() == getListHoliday[i].DateHoliday.getTime()) {
                return res.status(500).send("Ngày đầu tư là ngày nghỉ")
            }
        }

        const ListPolicyRate = await PolicyRateService.getListPolicyRate()
        const orderDateMinusEffDate = ListPolicyRate.map(({ effectiveDate }) => (OrderDate.getTime() - +effectiveDate.getTime()))
        const indexPolicyRate = findMinValueGreatEqual0InArray(orderDateMinusEffDate)

        const applicablePolicyRate = ListPolicyRate[indexPolicyRate]

        const applicableRateTerm = await PolicyRateService.getRateTermByPolicyRateId({ policyRateObjId: applicablePolicyRate._id })

        const Term = req.body.Term
        const convertApplicableRateTerm = applicableRateTerm.filter(a => a.term === Term)



        const TermMonth = Number(req.body.Term.slice(0, req.body.Term.length - 1))
        const CurrentDate = new Date(`${CurrentYear}/${CurrentMonth}/${CurrentDay}`)

        let MaturityDate = new Date(OrderDate)
        MaturityDate = new Date(MaturityDate.setMonth(MaturityDate.getMonth() + TermMonth))

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < getListHoliday.length; j++) {
                if (MaturityDate.getDay() == 0 | MaturityDate.getDay() == 6 | MaturityDate.getTime() == getListHoliday[j].DateHoliday.getTime()) {

                    MaturityDate = new Date(MaturityDate.setDate(MaturityDate.getDate() + 1))
                    console.log("f", j)
                }
            }
            console.log(i)
        }


        //tinh tien nhan
        const InvestmentPrincipal = req.body.InvestmentPrincipal
        if (!_.isInteger(InvestmentPrincipal)) {
            res.status(500).send('So tien khong hop le')
        }
        const HoldingPeriod = (MaturityDate - OrderDate) / (1000 * 3600 * 24)
        const Profit = Math.round(+InvestmentPrincipal * +convertApplicableRateTerm[0].rate / 100 * +HoldingPeriod / 365)
        const GrossIncome = InvestmentPrincipal + Profit

        //lấy user tạo

        const Creater = await LoginUserInfo(req.user)
        const { username, _id, userid, fullname } = Creater

        const newContract = {
            OrderNo: OrderNo,
            CustomerName: listCustomer.CustomerName,
            CustomerID: req.body.CustomerID,
            OrderDate: OrderDate,
            InvestmentPrincipal: InvestmentPrincipal,
            Term: req.body.Term,
            MaturityDate: MaturityDate,
            InterestRate: convertApplicableRateTerm[0].rate,
            Profit: Profit,
            GrossIncome: GrossIncome,
            CustodyObjectID: _id,
            CustodyID: userid,
            CustodyFullName: fullname,
            ContractStatus: "CHUA_DUYET",
            Creater: username,
            Approver: null
        }
        const createContract = await ContractService.CreateOrder(newContract)
        res.send(createContract)
    }
    catch (err) { return res.status(500).send(err.message) }
}

//approve HD
const apiApproveContract = async (req, res) => {

    //lấy user tạo

    const Creater = await LoginUserInfo(req.user)
    console.log("LoginUserInfo=>", Creater)
    const { username } = Creater

    const filter = {
        OrderNo: req.body.OrderNo,
        ContractStatus: "CHUA_DUYET"
    }

    const approve = {
        ContractStatus: "DA_DUYET",
        Approver: username
    }

    const approveContract = await ContractService.putAContract(filter, approve)
    if (approveContract === null) {
        return res.send('Thao tác thất bại')
    }
    res.send(`Hợp đồng ${req.body.OrderNo} đã duyệt thành công!`)
}

//xem chi tiet 1 HD
const apigetContractDetailByOrderNo = async (req, res) => {
    const OrderNo = req.body.OrderNo
    const data = await ContractService.getContractDetailByOrderNo(OrderNo)
    console.log(data)
    res.send(data)
}

//xem hd theo KH
const apigetContractbyCustomerID = async (req, res) => {
    const CustomerID = req.body.CustomerID
    const data = await ContractService.getContractbyCustomerID(CustomerID)
    console.log("DS HĐ theo KH ==>", data)
    res.send(data)
}

const apigetContractFilter = async (req, res) => {

    const filter = {
        CustodyID: {
            $in: [/^12/, "d"]
        },
        ContractStatus: "DA_DUYET"
    }
    const getcontract = await ContractService.getContractFilter(filter)
    console.log(getcontract)
    res.status(200).json(getcontract)
}

const apigetContractAggregate = async (req, res) => {
    const UserObjectID = req.body.UserObjectID

    UpperLevelMgtService


    const pineline = [
        {
            $match:
            {
                ContractStatus:
                {
                    $in: ["CHUA_DUYET", "DA_DUYET"]
                }
            }
        },
        {
            $group: {
                _id: { tenKH: "$CustomerName", CMT: "$CustomerID" },
                TongGT:
                {
                    $sum: {
                        "$toInt": "$InvestmentPrincipal"
                    }
                },
                SLHĐ: { $count: {} },
                TB:
                {
                    $avg: {
                        "$toInt": "$InvestmentPrincipal"
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
    apiApproveContract,
    apigetContractDetailByOrderNo,
    apigetContractbyCustomerID,
    apigetContractFilter,
    apigetContractAggregate,
    apiGetListContracts,
    apiGetContractPaginate
}
