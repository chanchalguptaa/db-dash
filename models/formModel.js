const mongoose = require('mongoose')
const validator = require('validator')


const  formSchema  = new mongoose.Schema({
    name : String,
    db_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'db'

    },
    table_name : String,
     fields : {
        type:Object
    },
    fields:[
        {
          type: String
        }
    ],
    
})
module.exports = mongoose.models.Form || mongoose.model('form' , formSchema);