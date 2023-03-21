const PolicyRateService = require("../services/PolicyRateService")

const apiGetListPolicyRate = (req,res)=>{
    console.log("apiGetListPolicy")
    res.status(200).send("apiGetListPolicy")
}

const apiCreatePolicyRate = async (req,res)=>{

    const policy = {
        policy: req.body.policy,
        policyName: req.body.policyName,
        effectiveDate: new Date(req.body.effectiveDate),
        status: "CHUA_DUYET",
        creator: "ADMIN",
        approver: "",
    }
    const insertPolicy= await PolicyRateService.createPolicyRate(policy)
    console.log(insertPolicy)

    const rateTerm = req.body.rateTerm
    rateTerm.forEach(a=>a.policyRateObjId=insertPolicy._id)
    console.log(rateTerm)


    const insertRateTermWithPolicy= await PolicyRateService.insertRateTerm(rateTerm)
    insertRateTermWithPolicy.forEach(a=>{
        delete a._id
        delete a.policyRateObjId
        delete a.__v
    })
    console.log("insertRateTermWithPolicy==>",insertRateTermWithPolicy)
//     insertPolicy.term=insertRateTermWithPolicy
// console.log("insertPolicy==>",insertPolicy)
//     return res.status(200).send("OKE")
//check lại chỗ này
}

module.exports = {
    apiGetListPolicyRate,
    apiCreatePolicyRate
}