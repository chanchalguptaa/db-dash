const mongoose = require('mongoose')
const validator = require('validator')
const User = require("./userModel") ;

const organizationSchema = new mongoose.Schema({
    org_name : String, 
    users : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'User' 
        }
    ]
})

module.exports = mongoose.model('Organization' , organizationSchema) ;
