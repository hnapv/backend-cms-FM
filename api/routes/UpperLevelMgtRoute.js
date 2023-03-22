const express = require('express')

const router = express.Router()

const UpperLevelMgtController = require('../controllers/UpperLevelMgtController')
const { verifyToken } = require('../controllers/UserController')

router.post('/api/insertUpperLevelMgt', verifyToken, UpperLevelMgtController.apiInsertUpperLevelMgt)
router.get('/api/getUpperLevelMgt', verifyToken, UpperLevelMgtController.apiGetUpperLevelMgt)

module.exports = router