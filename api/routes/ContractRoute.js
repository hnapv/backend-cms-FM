const express = require("express");

const router = express.Router();

const ContractController = require("../controllers/ContractController");
const UserController = require("../controllers/UserController")

router.post("/api/contract/createContract",UserController.verifyToken,ContractController.apiCreateContract);
router.put("/api/contract/approveContract",UserController.verifyToken,ContractController.apiApproveContract);
router.get("/api/v1/contract/getListContracts",ContractController.apiGetListContracts);
router.get("/api/v1/contract",ContractController.apiGetContractPaginate);
router.get("/api/contract/getContractDetail",ContractController.apigetContractDetailByOrderNo);
router.get("/api/contract/getContractByCustomerID",UserController.verifyToken,ContractController.apigetContractbyCustomerID);
router.get("/api/contract/getContractFilter",ContractController.apigetContractFilter);
router.get("/api/contract/getContractAggregate",ContractController.apigetContractAggregate);




module.exports = router;