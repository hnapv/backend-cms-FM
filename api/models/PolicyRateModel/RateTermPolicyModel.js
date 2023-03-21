const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateTermPolicySchema = new Schema({
    policyRateObjId: { type: Schema.Types.ObjectId, ref: 'PolicyRate' },
    term: String,
    rate: Number
})

const RateTermPolicy = mongoose.model("RateTermPolicy", RateTermPolicySchema);

module.exports = RateTermPolicy;