const UserService = require("../services/UserService")


const apiGetListUser = async (req, res) => {
    const getlistuser = await UserService.GetListUser()
    res.status(200).send(getlistuser);
}

const apiCreateUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt)

        const User = {
            userid: req.body.userid,
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashed,
            email: req.body.email
        }
        console.log(User);
        const insertNewUser = await UserService.CreateUser(User)
        res.send(insertNewUser)

    }
    catch (err) {
        console.log(err + "")
        return res.status(500).json(err)
    }
}


const apiPutUser = async (req, res) => {
    console.log('apiPutUser');
    res.send(200)
}

const apiDeleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const delUser = await UserService.DeleteUser(id)
        res.status(200).send('Tài khoản xóa thành công')
    }
    catch (err) { res.status(500).send("Thao tác thất bại") }
}


module.exports = {
    apiGetListUser,
    apiCreateUser,
    apiPutUser,
    apiDeleteUser
}