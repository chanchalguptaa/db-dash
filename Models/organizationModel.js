const mongoose = require('mongoose')
const validator = require('validator')
const User = require("./userModel") ;

const organizationSchema = new mongoose.Schema({
    org_name : String, 
    users :{
       user_id:
        { 
            user_id:{
                type : mongoose.Schema.Types.ObjectId ,
                ref : 'User' 
            },
            user_type: { 
                type: String,
                default: 'user' 
            }
        }
    }
})

module.exports = mongoose.model('Organization' , organizationSchema) ;
