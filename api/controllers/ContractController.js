const ContractService = require("../services/ContractService");
const CustomerInfoService = require("../services/CustomerInfoService")
const InterestRateService = require("../services/InterestRateService")
const UserService = require("../services/UserService")

const _ = require("lodash")


//tao HĐ đầu tư
const apiCreateContract = async (req, res) => {

    const today = new Date()
    const CurentDay = today.getDate()
    const CurentMonth = today.getMonth() + 1
    const CurentYear = today.getFullYear()

    //khoi tao so hd moi
    const listcontract = await ContractService.getListContract()
    const PrefixOrderNo = (data) => data.OrderNo.split("/")[0]
    const startOrderNo = Math.max(...listcontract.map(PrefixOrderNo)) + 1
    const lengthPrefixOrderNo = 6
    const OrderNo = `${('0000000000').slice(0, lengthPrefixOrderNo - startOrderNo.toString().length) + startOrderNo.toString()}/${CurentYear}/HTDT/ANHVP`

    //lay thong tin KH
    const CustomerID = req.body.CustomerID
    const listCustomer = await CustomerInfoService.GetACustomerInfoByCustomerID(CustomerID)
    if (!listCustomer.length < 1) {
        return res.status(500).send("Customer ID khong ton tai")
    }

    //lay thong tin ky han & lãi suất
    const Term = req.body.Term
    const getInterestRate = await InterestRateService.getListInterestRateByTerm(Term)
    const TermMonth = Number(req.body.Term.slice(0, req.body.Term.length - 1))
    const CurrentDate = new Date(`${CurentYear}/${CurentMonth}/${CurentDay}`)
    let MaturityDate = new Date(`${CurentYear}/${CurentMonth}/${CurentDay}`)
    MaturityDate = new Date(MaturityDate.setMonth(MaturityDate.getMonth() + TermMonth))

    //tinh tien nhan
    const InvestmentPrincipal = req.body.InvestmentPrincipal
    if (!_.isInteger(InvestmentPrincipal)) {
        res.status(500).send('So tien khong hop le')
    }
    const HoldingPeriod = (MaturityDate - CurrentDate) / (1000 * 3600 * 24)
    const Profit = Math.round(InvestmentPrincipal * getInterestRate[0].InterestRate / 100 * HoldingPeriod / 365)
    const GrossIncome = InvestmentPrincipal + Profit

    //lấy user tạo
    const getCreater = await UserService.GetUserById(req.user)
    const createUser = getCreater.username
    console.log(createUser)

    const newContract = {
        OrderNo: OrderNo,
        CustomerName: listCustomer.CustomerName,
        CustomerID: req.body.CustomerID,
        OrderDate: CurrentDate,
        InvestmentPrincipal: InvestmentPrincipal,
        Term: req.body.Term,
        MaturityDate: MaturityDate,
        InterestRate: getInterestRate.InterestRate,
        Profit: Profit,
        GrossIncome: GrossIncome,
        CustodyID: "d",
        CustodyFullName: 'Don gian',
        ContractStatus: "CHUA_DUYET",
        Creater: createUser,
        Approver: "ADMIN"
    }
    console.log(newContract)
    const createContract = await ContractService.CreateOrder(newContract)
    res.send(createContract)
}

//approve HD
const apiApproveContract = async (req, res) => {

    const filter = {
        OrderNo: req.body.OrderNo,
        ContractStatus: "CHUA_DUYET"
    }

    const approve = {
        ContractStatus: "DA_DUYET"
    }

    const approveContract = await ContractService.putAContract(filter, approve)
    if (approveContract === null) {
        return res.send('Tài khoản chưa được tạo')
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

module.exports = {
    apiCreateContract,
    apiApproveContract,
    apigetContractDetailByOrderNo,
    apigetContractbyCustomerID
}
