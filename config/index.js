var configValues = require("./config.json");

module.exports={
    getDbConnectionString: function(){
        return `mongodb+srv://${configValues.username}:${configValues.password}@nodetestdb.0w7vbbc.mongodb.net/test`;
    }
}
