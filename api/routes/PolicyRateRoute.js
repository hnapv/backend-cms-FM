const express = require('express')
const { apiGetListPolicyRate, apiCreatePolicyRate } = require('../controllers/PolicyRateController')

const router = express.Router()


router.get('/api/v1/policyRate/getPolicyRate', apiGetListPolicyRate)
router.post('/api/v1/policyRate/createPolicyRate', apiCreatePolicyRate)
router.post('/api/v1/policyRate/approvePolicyRate', apiApprovePolicyRate)


module.exports = router