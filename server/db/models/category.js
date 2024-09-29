const mongoose = require('mongoose');

const category = new mongoose.Schema({
    category : {
        type : String
    }
});

module.exports = mongoose.model("category", category);