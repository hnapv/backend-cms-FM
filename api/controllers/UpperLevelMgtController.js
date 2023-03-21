const UpperLevelMgtService = require("../services/UpperLevelMgtService")
const UserService = require("../services/UserService")
const apiInsertUpperLevelMgt = async (req, res) => {
    try {
        const UserID = req.body.UserID
        const UpperLevelMgt = req.body.UpperLevelMgt
        const findUser1 = await UserService.GetUserById(UserID)
        const findUser2 = await UserService.GetUserById(UpperLevelMgt)
        console.log("findUser", findUser1)
        console.log("findUser2", findUser2)
        if (!findUser1 || !findUser2) {
            return res.status(400).send("Lỗi. User không tồn tại")
        }
        if(UserID==UpperLevelMgt){
            console
            return res.status(400).send("Lỗi. User trùng nhau")
        }
        const data = {
            UserID: UserID,
            UpperLevelMgt: UpperLevelMgt
        }
        const insertUpperLevelMgt = await UpperLevelMgtService.InsertUpperLevelMgt(data)
        console.log('UpperLevelMgt')
        res.send(insertUpperLevelMgt)
    }
    catch (e) {
        console.log(e + "")
        return res.status(500).send("Thao tác không thành công")
    }
}

const apiGetUpperLevelMgt = async (req, res) => {
   try{
       const filter = {
           UserID: req.body.UserID
       }
       const populate = 'UpperLevelMgt' //truong chua obj trong model
       const getUpper = await UpperLevelMgtService.getUpperLevelMgt(filter,populate)
       const a = getUpper.map(x=>x.UpperLevelMgt)
       res.status(200).send(getUpper)
   }
   catch(e){
console.log(e+"")
return res.status(500).send(e)
   }
}

module.exports = {
    apiInsertUpperLevelMgt,
    apiGetUpperLevelMgt
}