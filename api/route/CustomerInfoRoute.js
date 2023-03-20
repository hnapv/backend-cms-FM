const express = require("express");
const { apiGetDetailCustomerByCustomerID, apiGetListCustomerInfo, apiCreateCustomerInfo, apiPutCustomerInfo } = require("../controllers/CustomerInfoController");

const router = express.Router();


router.post('/api/createCustomerInfo', apiCreateCustomerInfo)
router.get('/api/getListCustomer',apiGetListCustomerInfo)
router.post('/api/getDetailCustomerByCustomerID',apiGetDetailCustomerByCustomerID)
router.put('/api/customer/putCustomerInfo',apiPutCustomerInfo)

module.exports=router;