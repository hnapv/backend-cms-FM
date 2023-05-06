const express = require("express");
const { apiGetDetailCustomerByCustomerID, apiGetListCustomerInfo, apiCreateCustomerInfo, apiPutCustomerInfo } = require("../controllers/CustomerInfoController");
const { verifyToken } = require("../controllers/AuthorizationController");

const router = express.Router();


router.post('/api/createCustomerInfo', verifyToken, apiCreateCustomerInfo)
router.get('/api/getListCustomer', verifyToken, apiGetListCustomerInfo)
router.post('/api/getDetailCustomerByCustomerID', verifyToken, apiGetDetailCustomerByCustomerID)
router.put('/api/customer/putCustomerInfo', verifyToken, apiPutCustomerInfo)

module.exports = router;