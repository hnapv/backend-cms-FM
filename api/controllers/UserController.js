const UserService = require("../services/UserService")

const apiGetUserByUsernName= async(req,res)=>{
    console.log('apiGetUserByLoginName');
    res.send(200);
}

const apiCreateUser = async(req,res)=>{
    console.log('apiCreateUser');
    res.send(200)
}

const apiPutUser = async(req,res)=>{
    console.log('apiPutUser');
    res.send(200)
}

module.exports = {
    apiGetUserByUsernName,
    apiCreateUser,
    apiPutUser
}