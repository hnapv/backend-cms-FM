const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController")

router.get("/api/user/getListUser",UserController.verifyToken,UserController.apiGetListUser)
router.post('/api/user/loginUser',UserController.apiLoginUser)
router.post('/api/user/logoutUser',UserController.verifyToken,UserController.apiLogoutUser)
router.post('/api/user/createUser',UserController.apiCreateUser)
router.put("/api/user/putUser",UserController.apiPutUser);
router.delete("/api/user/deleteUser/:id",UserController.verifyTokenAndAdminAuth,UserController.apiDeleteUser);
router.post("/api/user/refreshToken",UserController.apiRefreshToken)

module.exports= router;