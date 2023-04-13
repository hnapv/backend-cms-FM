const _ = require('lodash')
const { findApplicablePolicyRate } = require('../../utils/utils')

const PolicyRateService = require("../services/PolicyRateService")

const apiGetListPolicyRate = async (req, res) => {
    const data = await PolicyRateService.getListPolicyRate()
    return res.status(200).send({
        EC: 0,
        EM: "Success",
        DT: data
    })
}

const apiGetRateTermByPolicyRateId = async (req, res) => {
    try {

        const data = {
            policyRateObjId: req.params.policyrateid
        }
        const rateTermByPolicyRateId = await PolicyRateService.getRateTermByPolicyRateId(data)
        return res.status(200).send({
            EC: 0,
            EM: "Get success",
            DT: rateTermByPolicyRateId
        })
    }
    catch (err) { res.status(500).send(err.message) }
}

const apiApprovePolicyRate = async (req, res) => {
    try {
        const filter = {
            _id: req.params.id,
            status: "CHUA_DUYET"
        }

        const action = {
            status: "DA_DUYET",
            approver: "ADMIN"
        }

        const data = await PolicyRateService.approvePolicyRate(filter, action)
        if (data === null) {
            return res.status(404).send({
                EC: -1,
                EM: "Not found"
            })
        }
        return res.status(200).send({
            EC: 0,
            EM: "Approve success"
        }
        )
    }
    catch (err) { res.status(500).send(err.message) }
}


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

const apiGetApplicablePolicyRate = async (req, res) => {
    try {
        const OrderDate = new Date(req.body.OrderDate)
        const ListPolicyRate = await PolicyRateService.getListPolicyRate()
        const applicablePolicyRate = await findApplicablePolicyRate(ListPolicyRate, OrderDate)
        const rawApplicableRateTerm = await PolicyRateService.getRateTermByPolicyRateId({ policyRateObjId: applicablePolicyRate._id })
        const applicableRateTerm = rawApplicableRateTerm.map(({term,rate})=>({term,rate}))
        console.log("req.body==>",req.body)
        res.status(200).send({
            applicablePolicyRate: applicablePolicyRate,
            rate_term: applicableRateTerm
        })
    }
    catch (err) {
        console.log(err + "")
        res.status(500).send(err.message)
    }
}

module.exports = {
    apiGetListPolicyRate,
    apiCreatePolicyRate,
    apiApprovePolicyRate,
    apiGetRateTermByPolicyRateId,
    apiGetApplicablePolicyRate
}