var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PolicyRateSchema = new Schema({
    policy: String,
    policyName: String,
    effectiveDate: Date,
    status: String,
    creator: String,
    approver: String,
    // rate_term: [{ type: Schema.Types.ObjectId, ref: 'RateTermPolicy' }]
}, { timestamps: true })


var PolicyRate = mongoose.model("PolicyRate", PolicyRateSchema);

module.exports = PolicyRate;