const ContractService = require ("../services/ContractService");
const _ = require("lodash")

const apiCreateContract = async(req,res)=>{
    
    const today = new Date()
    const OrderNo =  req.body.OrderNo
    const listcontact = await ContractService.getListContract()
    console.log(listcontact.OrderNo)

    res.send(listcontact)
    // "000001"+ "/"+today.getFullYear() + "/HTDT/ANHVP"
    // const i = 1;
    // get all so hd, lay 6 so dau, tim theo max 6 so dau, so can truyen = max +1
}


module.exports={
    apiCreateContract
}
