const express = require("express");
const { verifyToken, verifyTokenAndAdminAuth, apiLoginUser, apiLogoutUser, apiRefreshToken } = require("../controllers/AuthorizationController");

const router = express.Router();

const UserController = require("../controllers/UserController")

router.get("/api/user/getListUser", verifyToken, UserController.apiGetListUser)
router.post('/api/user/loginUser', apiLoginUser)
router.post('/api/user/logoutUser', verifyToken, apiLogoutUser)
router.post('/api/user/createUser', verifyTokenAndAdminAuth, UserController.apiCreateUser)
router.put("/api/user/putUser", verifyTokenAndAdminAuth, UserController.apiPutUser);
router.delete("/api/user/deleteUser/:id", verifyTokenAndAdminAuth, UserController.apiDeleteUser);
router.post("/api/user/refreshToken", apiRefreshToken)

module.exports = router;