const express = require('express')

const router = express.Router()

const UpperLevelMgtController = require('../controllers/UpperLevelMgtController')

router.post('/api/insertUpperLevelMgt', UpperLevelMgtController.apiInsertUpperLevelMgt)
router.get('/api/getUpperLevelMgt', UpperLevelMgtController.apiGetUpperLevelMgt)

module.exports = router