const mongoose = require('mongoose')
const validator = require('validator')
const User = require("./userModel") ;

const organizationSchema = new mongoose.Schema({
    name : {
        type:String,
        unique:true
    }, 
    users :[
         {
             user_id:{
                 type : mongoose.Schema.Types.ObjectId ,
                 ref : 'User' 
             },
             user_type: { 
                 type: String,
                 default: 'user' //admin
             }
        }
    ]
})

module.exports = mongoose.models.Organization || mongoose.model('Organization' , organizationSchema) ;
