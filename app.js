var express = require("express");
const { default: mongoose } = require("mongoose");
var morgan = require("morgan");

var config = require("./config");
const InterestRateTableRoute = require("./api/route/InteresRateRoute");

var app = express();
var port = process.env.PORT ||3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan("dev"));

app.use(InterestRateTableRoute)

mongoose.connect(config.getDbConnectionString());

app.get("/",function(req,res){
    res.send("<h1>Hello anh em<h1>")});

app.listen(port,function(){
    console.log("App listening on port: ",port);
});