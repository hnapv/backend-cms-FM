const Holiday = require("../models/HolidayModel")

const InsertHoliday = async(a)=>{
    const data = await Holiday.create(a)
    return data
}

const ChangeStatusHoliday = async(a)=>{
    const data = await Holiday.findByIdAndUpdate(a)
    return data

}

const GetListHolidayDate = async(a) =>{
    const data = await Holiday.find(a)
    return data
}

module.exports= {
    InsertHoliday,
    ChangeStatusHoliday,
    GetListHolidayDate
}