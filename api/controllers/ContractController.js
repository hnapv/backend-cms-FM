const ContractService = require("../services/ContractService");
const CustomerInfoService = require("../services/CustomerInfoService")
const InterestRateService = require("../services/InterestRateService")

const _ = require("lodash")



const apiCreateContract = async (req, res) => {


    const today = new Date()
    const CurentDay = today.getDate()
    const CurentMonth = today.getMonth() + 1
    const CurentYear = today.getFullYear()

    //lay so hd
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

    //lay thong tin ky han
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
    const Profit = Math.round(InvestmentPrincipal * getInterestRate.InterestRate / 100 * HoldingPeriod / 365)
    const GrossIncome = InvestmentPrincipal + Profit

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
        ContractStatus: "CHUA_DUYET"
    }
    console.log(newContract)
    const createContract = await ContractService.CreateOrder(newContract)
    res.send(200)
}

const apigetContractDetailByOrderNo = async(req,res)=>{
    const OrderNo = req.body.OrderNo
    const data = await ContractService.getContractDetailByOrderNo(OrderNo)
    console.log(data)
    res.send (data)
}


module.exports = {
    apiCreateContract,
    apigetContractDetailByOrderNo
}
