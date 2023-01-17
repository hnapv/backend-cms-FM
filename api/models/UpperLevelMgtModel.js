const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UpperLevelMgtSchema = new Schema ({
    UserID: { type: Schema.Types.ObjectId, ref: 'User' },
    UpperLevelMgt: { type: Schema.Types.ObjectId, ref: 'User' },
})

var UpperLevelMgt = mongoose.model("UpperLevelMgt",UpperLevelMgtSchema);

module.exports = UpperLevelMgt;