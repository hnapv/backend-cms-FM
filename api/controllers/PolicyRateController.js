const _ = require('lodash')

const PolicyRateService = require("../services/PolicyRateService")

const apiGetListPolicyRate = async (req, res) => {
    const data = await PolicyRateService.getListPolicyRate()
    return res.status(200).send({
        EC: 0,
        EM: "Success",
        DT: data
    })
}

const apiApprovePolicyRate = async (req,res )


const apiCreatePolicyRate = async (req, res) => {
    try {
        const policy = {
            policy: req.body.policy,
            policyName: req.body.policyName,
            effectiveDate: new Date(req.body.effectiveDate),
            status: "CHUA_DUYET",
            creator: "ADMIN",
            approver: "",
        }
        const rateTerm = req.body.rateTerm

        const insertPolicy = await PolicyRateService.createPolicyRate(policy)
        
        rateTerm.forEach(a => a.policyRateObjId = insertPolicy._id)
        const insertRateTermWithPolicy = await PolicyRateService.insertRateTerm(rateTerm)
        return res.status(200).send("Create success")
    }
    catch (err) {
        console.log(err + "")
        res.status(500).send(err.message)
    }
}

module.exports = {
    apiGetListPolicyRate,
    apiCreatePolicyRate
}