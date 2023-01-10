const UpperLevelMgt = require("../models/UpperLevelMgtModel")

const InsertUpperLevelMgt = async(a)=>{
    const insertdata = await UpperLevelMgt.create(a)
    return insertdata
}

module.exports= {
    InsertUpperLevelMgt
}