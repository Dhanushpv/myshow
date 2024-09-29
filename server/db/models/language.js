const mongoose = require('mongoose');

const language = new mongoose.Schema({
    language : String
     
});

module.exports = mongoose.model("language", language);