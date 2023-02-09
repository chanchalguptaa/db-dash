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
        user_id:{    
            id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true 
            },
            access : {
                    type: [String, Object]
            }
        }
    },
    tables : {
        table_id : {
            table_name:String,
            fields:{
              field_id :{
                field_name: String,
                field_type: String,
              }
            },
            view:{
                view_id:String,
                view_name:String,
                fields:{
                    table_id:{
                        field:Object
                    }
                }
            },
            filter_view : {
                filter_id:{
                    filter_name:String,
                    filter_query:String
                }
            },
            form:{
                type : Object
            }
        },
    },
    auth_keys : {
        auth_key :  {
            auth_id:String,
            access : {
                type: [String, Object]
            }
        }
    }
})

module.exports = mongoose.model('db' , dbSchema);