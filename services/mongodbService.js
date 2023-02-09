const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async ()=>{
    try {
        // console.log("mongodb:- "+process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI , {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`CONNECT TO M_DB ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR:- ${error}`);
    }
}




module.exports= connectDB