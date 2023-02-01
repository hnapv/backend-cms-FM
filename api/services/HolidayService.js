const Holiday = require("../models/HolidayModel")

const InsertHoliday = async(a)=>{
    const data = await Holiday.create(a)
    return data
}

const ChangeStatusHoliday = async(a)=>{
    const data = await Holiday.findByIdAndUpdate(a)
}

module.exports= {
    InsertHoliday,
    ChangeStatusHoliday
}