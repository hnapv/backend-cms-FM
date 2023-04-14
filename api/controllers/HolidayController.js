const HolidayService = require("../services/HolidayService")

const apiGetListHolidayDate = async(req,res)=>{
    try{
        const listdate = await HolidayService.GetListHolidayDate()
        console.log(listdate)
        res.status(200).send(listdate)
    }
    catch(e){console.log(e+"")}
}

const apiPutHolidayDate = async(req,res)=>{
    console.log("apiPutHolidayDate")
    res.sendStatus(200)
}

const apiPostHolidayDate = async(req,res)=>{
    const data = {
        dateHoliday: new Date(req.body.dateHoliday),
        description: req.body.description,
        active: req.body.active,
    }
    const insertDate = await HolidayService.InsertHoliday(data)
    console.log("inserdat=>",insertDate)
    res.status(200).send(insertDate)
}

module.exports= {
    apiPutHolidayDate,
    apiPostHolidayDate,
    apiGetListHolidayDate
}