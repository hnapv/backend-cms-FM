const express = require('express')
const { apiGetListPolicyRate, apiCreatePolicyRate, apiApprovePolicyRate, apiGetRateTermByPolicyRateId } = require('../controllers/PolicyRateController')

const router = express.Router()


router.get('/api/v1/policyRate/getPolicyRate', apiGetListPolicyRate)
router.get('/api/v1/policyRate/getRateTermByPolicyRateId/:policyrateid', apiGetRateTermByPolicyRateId)
router.post('/api/v1/policyRate/createPolicyRate', apiCreatePolicyRate)
router.put('/api/v1/policyRate/approvePolicyRate/:id', apiApprovePolicyRate)


module.exports = router