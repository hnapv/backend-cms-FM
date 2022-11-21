var express = require("express");
const { default: mongoose } = require("mongoose");
var morgan = require("morgan");
const dotenv= require('dotenv')

const InterestRateRoute = require("./api/route/InteresRateRoute");
const CustomerInfoRoute = require("./api/route/CustomerInfoRoute");
const ContractRoute = require("./api/route/ContractRoute")
const UserRoute = require("./api/route/UserRoute")

dotenv.config()
var app = express();
var port = process.env.PORT ||3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan("dev"));

app.use(InterestRateRoute)
app.use(ContractRoute);
app.use(UserRoute)
app.use(CustomerInfoRoute)


mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("Connect to MONGODB")
});

app.get("/",function(req,res){
    res.send("<h1>Hello anh em<h1>")});

app.listen(port,function(){
    console.log("App listening on port: ",port);
});