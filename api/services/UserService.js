const UserModel = require("../models/UserModel")

const GetUserByUserName = async (username)=>{
    const listUser = await UserModel.findOne({
        username: username
    })
    return listUser
}

const CreateUser = async(data)=>{
    const createdata = await UserModel.create(data)
    return createdata
}



// const PutUser = async()=>{
//     const 
// }


module.exports={
    GetUserByUserName,
    CreateUser
}