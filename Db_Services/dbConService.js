const mongoose = require('mongoose')
const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery',true);
        mongoose.connect('mongodb://127.0.0.1:27017/masters_1')        
    } catch (error) {
        console.log(`ERROR:- ${error}`);
    }
}

module.exports =connectDB;



