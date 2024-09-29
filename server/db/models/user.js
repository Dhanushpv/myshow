const mongoose = require('mongoose');


const shows = new mongoose.Schema({

    title:{
        type : String,
        // required :true,
    },
    rating:{
        type : String,
        // required :true,
    },
    vote:{
        type : String
    },
    image:{
        type : String,
    },

    category:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    language:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "language",
    },
    about:{
        type : String,
    },
    
});

let users = mongoose.model("shows",shows);
module.exports=users