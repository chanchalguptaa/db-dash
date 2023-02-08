const User = require("../Models/userModel")

async function getAllUser(){
    return await User.find();
}

async function getUserById(id){
    return await User.findById(id)
}

async function saveUser(user){
    await user.save()
}

async function updateUser(id,user){

    try {
        return await User.findByIdAndUpdate(id,user)
    } catch (error) {
        console.log(error);
    }
}

async function deleteUserById(id){
    return await User.findByIdAndDelete(id)
}

module.exports={getAllUser,getUserById,saveUser,updateUser,deleteUserById}