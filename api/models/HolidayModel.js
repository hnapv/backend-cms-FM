var mongoose = require("mongoose");

var Schema= mongoose.Schema;
var HolidaySchema= new Schema({
    dateHoliday: Date,
    description: String,
    active: Boolean,
    

}, {timestamps: true});

var Holiday = mongoose.model("Holiday",HolidaySchema);

module.exports = Holiday;