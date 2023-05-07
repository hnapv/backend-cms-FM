const express = require("express");
const { apiGetListBanks,apiAddCustomerBankAccount,apiApproveCustomerBankAccount ,apiGetBankAccountByCustomer} = require("../controllers/CusBankAccController");

const router = express.Router();

router.get("/api/v1/getListBanks",apiGetListBanks)
router.post("/api/v1/customer/addBankAccount",apiAddCustomerBankAccount)
router.put("/api/v1/customer/approveBankAccount",apiApproveCustomerBankAccount)
router.get("/api/v1/customer/getBankAccountByCustomer/:customerId",apiGetBankAccountByCustomer)

module.exports = router;