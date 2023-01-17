var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var HolidaySchema= new Schema({
    DateHoliday: Date,
    Description: String,
    Active: Boolean,
    

}, {timestamps: true});

var Holiday = mongoose.model("Holiday",HolidaySchema);

module.exports = Holiday;