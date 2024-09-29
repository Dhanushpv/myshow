const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

async function mongoConnect(){

    try{
        await mongoose.connect(process.env.MONGOD_URL);
        console.log("Databace connection established...");
    }catch(error) {
    console.log("error",error);        
    }

}

module.exports=mongoConnect;