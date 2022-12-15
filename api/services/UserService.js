const UserModel = require("../models/UserModel")

const GetUserByUserName = async (username)=>{
    const listUser = await UserModel.findOne({
        username: username
    })
    return listUser
}

const GetUserById = async(id)=>{
    const user = await UserModel.findById(id)
    return user
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
    GetUserById,
    GetListUser,
    CreateUser,
    DeleteUser
}