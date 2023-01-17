const Holiday = require("../models/HolidayModel")

const InsertHoliday = async(a)=>{
    const data = await Holiday.create(a)
    return data
}

module.exports= {
    InsertHoliday
}