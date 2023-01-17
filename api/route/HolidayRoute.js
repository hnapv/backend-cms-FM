const express = require("express");

const router = express.Router();

const HolidayController = require("../controllers/HolidayController")

router.get("/api/holiday/getHolidayDate",HolidayController.apiGetHolidayDate)
router.post("/api/holiday/postHolidayDate",HolidayController.apiPostHolidayDate)

module.exports = router