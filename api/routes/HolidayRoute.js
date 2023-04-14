const express = require("express");

const router = express.Router();

const HolidayController = require("../controllers/HolidayController");
const { verifyToken } = require("../controllers/UserController");

router.get("/api/holiday/getHolidayDate", verifyToken, HolidayController.apiGetListHolidayDate)
router.post("/api/holiday/postHolidayDate", verifyToken, HolidayController.apiPostHolidayDate)
router.put("/api/holiday/putHolidayDate", verifyToken, HolidayController.apiPutHolidayDate)

module.exports = router