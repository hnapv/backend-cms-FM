const ContractService = require ("../services/ContractService");
const _ = require("lodash")

const apiCreateContract = async(req,res)=>{
    
    const today = new Date()
    
    const listcontact = await ContractService.getListContract()
    console.log(listcontact)
    const getOrderNo = listcontact.map(data =>data.OrderNo)
    
    // var test = listcontact.split(" ")
    // console.log("thử",test)
    const max =Math.max.apply(Math,listcontact.map(function(o){return o.number}))
    console.log(max)
    res.send(listcontact)
    // "000001"+ "/"+today.getFullYear() + "/HTDT/ANHVP"
    // const i = 1;
    // get all so hd, lay 6 so dau, tim theo max 6 so dau, so can truyen = max +1
}


module.exports={
    apiCreateContract
}
