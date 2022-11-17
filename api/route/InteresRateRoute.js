const express = require('express')

const router = express.Router()

const InterestRateController = require('../controllers/InterestRateController')

router.post('/api/createInterestRate', InterestRateController.apiCreateInterestRate)
router.get('/api/listInterestRate', InterestRateController.apiGetListInterestRate)
router.get('/api/getDetailInterestRate/:InterestRateTableCode',InterestRateController.apiGetInterestRateTableCode)


module.exports = router