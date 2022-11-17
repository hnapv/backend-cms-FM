const express = require("express");

const router = express.Router();

const CustomerInfoController = require("../controllers/CustomerInfoController")

router.post('/api/createCustomerInfo', CustomerInfoController.apiCreateCustomerInfo)
router.get('/api/getListCusInfo',CustomerInfoController.apiGetListCustomerInfo)
router.put('/api/customer/putCustomerInfo',CustomerInfoController.apiPutCustomerInfo)

module.exports=router;