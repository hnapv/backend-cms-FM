const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LevelUserSchema = new Schema ({
    UserID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    Manager: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

var LevelUser = mongoose.model("LevelUser",LevelUserSchema);

module.exports = LevelUser;