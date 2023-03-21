const express = require('express')
const { apiGetListPolicyRate, apiCreatePolicyRate } = require('../controllers/PolicyRateController')

const router = express.Router()


router.get('/api/v1/getPolicyRate', apiGetListPolicyRate)
router.post('/api/v1/createPolicyRate', apiCreatePolicyRate)


module.exports = router