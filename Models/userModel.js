const mongoose = require('mongoose')
const validator = require('validator')



const userSchema = new mongoose.Schema({
    username: {
      type:String
    },
    password: {
        type:String,
        required:true
      },
   
    email: { 
      type: String, 
      required: true 
    },
});

module.exports = mongoose.model('User', userSchema);