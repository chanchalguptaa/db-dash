const mongoose = require('mongoose')
const connectDB = async ()=>{
    try {
        // console.log("mongodb:- "+process.env.MONGODB_URI);
        mongoose.set('strictQuery',true);
        mongoose.connect('mongodb://127.0.0.1:27017/masters_1')        
        // console.log(`CONNECT TO M_DB ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR:- ${error}`);
    }
}




module.exports =connectDB;