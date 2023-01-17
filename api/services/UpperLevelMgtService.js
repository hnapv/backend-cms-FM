const UpperLevelMgt = require("../models/UpperLevelMgtModel")

const InsertUpperLevelMgt = async(a)=>{
    const insertdata = await UpperLevelMgt.create(a)
    return insertdata
}

const getUpperLevelMgt = async(a,b)=>{
    const getdata = await UpperLevelMgt.find(a).populate(b).exec()
    return getdata
}

module.exports= {
    InsertUpperLevelMgt,
    getUpperLevelMgt
}