var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ContractSchema = new Schema({

})

var Contract = mongoose.model("Contract",ContractSchema);

module.exports= Contract;