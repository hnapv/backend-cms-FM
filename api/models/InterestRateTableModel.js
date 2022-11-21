var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestRateSchema = new Schema({
    InterestRateTableCode: String,
    InterestRateTableName: String,
    Term: String,
    InterestRate: Number,
    EffectiveDate: Date,
}, { timestamps: true })

var InterestRateTable = mongoose.model("InterestRateTable", InterestRateSchema);

module.exports = InterestRateTable;