const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI , {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
    } catch (error) {
        console.log(`ERROR:- ${error}`);
    }
}




module.exports= connectDB