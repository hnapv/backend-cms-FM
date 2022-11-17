const UserModel = require("../models/UserModel")

const GetUserByUserName = async (UserName)=>{
    const listUser = await UserModel.find({
        UserName: UserName
    })
    return listUser
}

const CreateUser = async()=>{
    const User ={
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
    }
    const createdata = await UserModel.create(User)
    return createdata
}

// const PutUser = async()=>{
//     const 
// }


module.exports={
    GetUserByUserName,
    CreateUser
}