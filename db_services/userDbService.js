const User = require("../models/userModel")

async function getAllUser(){
    return await User.find();
}

async function getUserById(id){
    return await User.findById(id)
}

async function saveUser(user){
    await User.save()
}

async function updateUser(first_name,last_name,id,dbs){ 

    try {
        return await User.updateOne({
            _id:id
        },
        {
            $set:{
                first_name,
                last_name,
                dbs
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserById(id){
    return await User.findByIdAndDelete(id)
}

async function getUserByEmail(email) {
    const user= await User.findOne({email: email});
    return user;
}

module.exports={getAllUser,getUserById,saveUser,updateUser,deleteUserById,getUserByEmail}