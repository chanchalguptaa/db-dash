const mongoose = require('mongoose')
const validator = require('validator')
const db = require("./dbModel")
const userSchema = new mongoose.Schema({

    first_name: {
      type:String
    },
    last_name: {
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
    dbs :
    [ 
       {type:Object}
    ]
  }
);

module.exports = mongoose.model('Users', userSchema);
