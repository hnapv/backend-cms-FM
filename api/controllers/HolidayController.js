const HolidayService = require("../services/HolidayService")

const apiPutHolidayDate = async(req,res)=>{
    console.log("apiPutHolidayDate")
    res.sendStatus(200)
}

const apiPostHolidayDate = async(req,res)=>{
    const data = {
        DateHoliday: new Date(req.body.DateHoliday),
        Description: req.body.Description,
        Active: req.body.Active,
    }
    console.log("data=>",data)
    const insertDate = await HolidayService.InsertHoliday(data)
    console.log("inserdat=>",insertDate)
    res.status(200).send(insertDate)
}

module.exports= {
    apiPutHolidayDate,
    apiPostHolidayDate
}