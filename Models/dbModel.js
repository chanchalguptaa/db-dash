const mongoose = require('mongoose')
const validator = require('validator')
const Organization = require('./organizationModel')
const User = require('./userModel')

const dbSchema = new mongoose.Schema({
    db_name : String , 
    db_con_url : String , 
    org_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Organization',
        required:true
    },
    users : {
      type:Object,
    },
    tables : {
      type:Object
    },
    auth_keys : {
        type:Object
    }
})

module.exports = mongoose.model('db' , dbSchema);