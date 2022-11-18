const UserService = require("../services/UserService")
const bcrypt = require("bcrypt");

const apiGetUserByUserName= async(req,res)=>{
    console.log('apiGetUserByLoginName');
    res.send(200);
}

const apiCreateUser = async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt)
        const User ={
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashed,
            email: req.body.email
        }
        console.log(User);
        const insertNewUser = await UserService.CreateUser(User)
        res.send(insertNewUser)

    }
    catch(err){res.status(500).json(err)}
}

const apiLoginUser = async(req,res)=>{
    try{
        const username = req.body.username
        const user = await UserService.GetUserByUserName(username);
        if(!user){
            res.status(404).send("Tai khoan khong ton tai");
        }
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword){
            res.status(400).send("Mat khau khong chinh xac!")
        }
        if(user && validPassword){
            res.status(200).send(user)
        }
    }
    catch(err){res.status(500).json(err)}
}



const apiPutUser = async(req,res)=>{
    console.log('apiPutUser');
    res.send(200)
}

module.exports = {
    apiGetUserByUserName,
    apiCreateUser,
    apiPutUser,
    apiLoginUser
}