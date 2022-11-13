const express = require('express')

const router = express.Router()

const InterestRateTableController = require('../controllers/InterestRateTableController')

router.post('/api/postInterestRate', InterestRateTableController.apiCreateInterestRate)
router.get('/api/listInteresRate', InterestRateTableController.apiGetListInteresRate)


module.exports = router