const express = require("express");

const router = express.Router();

const ContractController = require("../controllers/ContractController");
const { verifyToken, verifyTokenAndAdminAuth } = require("../controllers/UserController");

router.post("/api/v1/contract/createContract", verifyToken, ContractController.apiCreateContract);
router.put("/api/contract/approveContract", verifyTokenAndAdminAuth, ContractController.apiApproveContract);
router.get("/api/v1/contract/getListContracts", verifyToken, ContractController.apiGetListContracts);
router.get("/api/v1/contract", verifyToken, ContractController.apiGetContractPaginate);
router.get("/api/contract/getContractDetail", verifyToken, ContractController.apigetContractDetailByOrderNo);
router.get("/api/contract/getContractByCustomerID", verifyToken, ContractController.apigetContractbyCustomerID);
router.get("/api/contract/getContractFilter", verifyToken, ContractController.apigetContractFilter);
router.get("/api/contract/getContractAggregate", verifyToken, ContractController.apigetContractAggregate);




module.exports = router;