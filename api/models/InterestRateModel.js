var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var InterestRateSchema = new Schema({
    InterestRateTableCode: String,
    InterestRateTableName: String,
    term: String,
    InterestRate: Number,
    effectiveDate: Date,
})

var InterestRateTable = mongoose.model("InterestRateTable",InterestRateSchema);

module.exports= InterestRateTable;