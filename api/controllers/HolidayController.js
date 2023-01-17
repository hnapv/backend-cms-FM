const HolidayService = require("../services/HolidayService")

const apiGetHolidayDate = async(req,res)=>{
    console.log("apiGetHolidayDate")
    res.sendStatus(200)
}

const apiPostHolidayDate = async(req,res)=>{
    console.log("apiGetHolidayDate")
    res.sendStatus(200)
}

module.exports= {
    apiGetHolidayDate,
    apiPostHolidayDate
}