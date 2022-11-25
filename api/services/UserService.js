const UserModel = require("../models/UserModel")

const GetUserByUserName = async (username)=>{
    const listUser = await UserModel.findOne({
        username: username
    })
    return listUser
}

const GetListUser = async ()=>{
    const listUser = await UserModel.find()
    return listUser
}

const CreateUser = async(data)=>{
    const createdata = await UserModel.create(data)
    return createdata
}

const DeleteUser = async(data)=>{
    const deleteData = await UserModel.findByIdAndDelete(data)
    return deleteData
}



// const PutUser = async()=>{
//     const 
// }


module.exports={
    GetUserByUserName,
    GetListUser,
    CreateUser,
    DeleteUser
}