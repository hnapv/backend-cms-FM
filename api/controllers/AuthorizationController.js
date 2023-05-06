const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const UserService = require("../services/UserService")

let refreshTokens = []

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).send(
                    {
                        EC: -1,
                        EM: "Token is not valid"
                    })
            }
            req.user = user
            // xác thực phân quyền ở đoạn này???
            // console.log("useracc",user)
            next()
        })
    }
    else {
        res.status(401).send({
            EC: -1,
            EM: "You're not authenticated"
        })
    }
}

const verifyTokenAndAdminAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id == req.body._id || req.user.admin) {
            next();
        }
        else {
            res.status(403).send(
                {
                    EC: -1,
                    EM: "You're not allowed to delete other"
                })
        }
    })
}
//generate access token
const generateAccessToken = (user) => {
    return jwt.sign({
        _id: user._id,
        admin: user.admin,
        type: "Access"
        // lưu thêm thông tin phân quyền vào đây
    },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "2h" });
}
//generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({
        _id: user._id,
        admin: user.admin,
        type: "Refresh"
    },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" })
}

const apiRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    console.log("refreshToken=+>", refreshToken)
    if (!refreshToken) return res.status(401).json("You're not authenticated")
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid")
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            console.log(err)
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)
        refreshTokens.push(newRefreshToken)
        console.log(refreshTokens)
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
            maxAge: 9000000000
        })
        res.status(200).json({ accessToken: newAccessToken })
    })
}

const apiLoginUser = async (req, res) => {
    try {
        const username = req.body.username
        const user = await UserService.GetUserByUserName(username);
        console.log("vào đây chưa==>")
        if (!user) {
            return res.status(200).send({
                EC: -1,
                EM: "Tai khoan khong ton tai"
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(200).send({
                EC: -1,
                EM: "Mật khẩu không chính xác"
            });
        }
        if (user && validPassword) {
            const accessToken = generateAccessToken(user)
            console.log("user==>",user)
            const refreshToken = generateRefreshToken(user)
            refreshTokens.push(refreshToken)
            console.log(refreshTokens)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
                maxAge: 9000000000
            })
            const { password, ...others } = user._doc
            res.status(200).send({
                EC: 0,
                EM: "Đăng nhập thành công",
                account: { ...others, accessToken }
            })
        }
    }
    catch (err) {
        console.log(err + "")
        return res.status(500).send(err)
    }
}

const apiLogoutUser = async (req, res) => {
    res.clearCookie("refreshToken")
    refreshTokens = refreshTokens.filter(token => token != req.cookies.refreshToken)
    res.status(200).json("Logged out!")
}

module.exports = {
    verifyToken,
    verifyTokenAndAdminAuth,
    apiRefreshToken,
    apiLoginUser,
    apiLogoutUser,
}