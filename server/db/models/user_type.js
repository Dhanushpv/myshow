const mongoose = require('mongoose');

const user_type = new mongoose.Schema({
    user_type : "String",  
});

module.exports = mongoose.model("user_type", user_type);