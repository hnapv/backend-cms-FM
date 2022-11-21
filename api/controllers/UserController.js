const UserService = require("../services/UserService")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.headers.token;
    if(token){
        const accessToken = token.split(" ")[1];
        console.log(accessToken)
        jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
            if(err){
                res.status(403).json("Token is not valid")
            }
            req.user=user
            next()
        })
    }
    else {
        res.status(401).json("You're not authenticated")
    }
}

const verifyTokenAndAdminAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user._id == req.params._id ||req.user.admin){
            next();
        }
        else{
            res.status(403).json("You're not allowed to delete other")
        }
    })
}

const apiGetListUser= async(req,res)=>{
    const getlistuser = await UserService.GetListUser()
    res.send(getlistuser);
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
           const accessToken= jwt.sign({
                _id: user._id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "30s"})
            const {password, ...others}= user._doc
            res.status(200).send({...others,accessToken})
        }
    }
    catch(err){res.status(500).json(err)}
}



const apiPutUser = async(req,res)=>{
    console.log('apiPutUser');
    res.send(200)
}

module.exports = {
    apiGetListUser,
    apiCreateUser,
    apiPutUser,
    apiLoginUser,
    verifyToken
}