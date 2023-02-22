const mongoose = require('mongoose')
const validator = require('validator')
const Organization = require('./organizationModel')
const User = require('./userModel')

const dbSchema = new mongoose.Schema({
    name : String , 
    con_url : String , 
    org_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Organization',
        //required:true
    },
    users : {
      type:Object,
    //   user_id:{
    //     acess: {Object type}     "1" || Object
    //   }
    },
    tables : {
      type:Object
      // table_id:{
      //   table_name: String,
      //   fields:{
      //       field_id:{
      //           field_name: String,
      //           field_type: String
      //       }
      //   }
      // }
    //     view:{
    //         view_id: String,
    //         view_name: String,
    //         table_id:{
    //             field_id:{
    //                 field_name:String,
    //                 field_type:String
    //             }
    //         },
    //     },
    //     filter:{
    //         filter_id:{
    //             filter_name: String,
    //             query:String
    //         }
    //     },
    //     form:{
    //        refreceid 
    //     }
    //     }
    },
    auth_keys : {
        type:Object
        // auth_id:{
        //     acess: {Object type}     "1" || Object
        // }
    }
})

module.exports = mongoose.models.db || mongoose.model('db' , dbSchema);