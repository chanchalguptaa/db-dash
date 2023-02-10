const mongoose = require('mongoose')
const validator = require('validator')
const db = require("./dbModel")
const userSchema = new mongoose.Schema({

    name: {
      type:String
    },

    password: {
        type:String
      },

      email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true,"duplicated insert of email"],
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
          }
        }
      },
      org : [
        {
          org_id : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Organization',
              required : true 
          },
          db :[
            {
              type : mongoose.Schema.Types.ObjectId,
              ref: 'db'
            }
          ]
      }
    ]
});

module.exports = mongoose.model('User', userSchema);
