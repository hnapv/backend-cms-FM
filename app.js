var express = require("express");
var cors = require('cors')
const { default: mongoose } = require("mongoose");
var morgan = require("morgan");
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')

const PolicyRateRoute = require("./api/routes/PolicyRateRoute");
// const InterestRateRoute = require("./api/routes/InteresRateRoute");
const CustomerInfoRoute = require("./api/routes/CustomerInfoRoute");
const ContractRoute = require("./api/routes/ContractRoute")
const UserRoute = require("./api/routes/UserRoute")
const UpperLevelMgtRoute = require("./api/routes/UpperLevelMgtRoute")
const HolidayRoute = require("./api/routes/HolidayRoute")
const CusBankAccRoute = require("./api/routes/CusBankAccRoute")

dotenv.config()
var app = express();
var port = process.env.PORT || 3000;

var corsOptions = {
    origin: process.env.FRONTEND_URL, //frontend url
    credentials: true
}
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use("/api",(res,req,next)=>{
//     console.log("thế")
//     next()
// });


// app.use(InterestRateRoute)
app.use(PolicyRateRoute)
app.use(ContractRoute);
app.use(UserRoute)
app.use(CustomerInfoRoute)
app.use(UpperLevelMgtRoute)
app.use(HolidayRoute)
app.use(CusBankAccRoute)


mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connect to MONGODB")
});

app.get("/", function (req, res) {
    res.send("<h1>Hello anh em<h1>")
});

app.listen(port, function () {
    console.log("App listening on port: ", port);
});