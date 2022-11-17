const express = require("express");

const router = express.Router();

const ContractController = require("../controllers/ContractController")

router.post("/api/contract/createContract",ContractController.apiCreateContract);



module.exports = router;