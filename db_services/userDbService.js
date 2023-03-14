const User = require("../models/userModel")

async function getAllUser(){
    return await User.find().populate("dbs");
}

async function getUserById(id){
    return await User.findById(id).populate("dbs");    
}

async function saveUser(user){
    await user.save()
}

async function deleteDbInUser(dbId) {
    try {
      const users = await User.find({ dbs: { $in: dbId } });
      users.forEach((user) => {
        user.dbs.pull(...dbId);
        user.save();
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

async function updateUser(first_name,last_name,id,db){ 

    try {
        return await User.updateOne({
            _id:id
        },
        {
            $set:{
                first_name,
                last_name,
            
            },
            $push:{dbs:db}
        })
    } catch (error) {
        console.log(error);
    }
}

async function addDbIdInUSerSchema(user_id,dbId){
    try {
        return await User.updateOne({
            _id:user_id
        },
        {
            $push:{dbs:dbId+""}
        })
    } catch (error) {
        console.log(error);
    }
}
async function deleteUserById(id){
    return await User.findByIdAndDelete(id)
}
async function getUser(email){
    return await User.findOne({email: email});
}
async function getUserByEmail(email) { 
    const user= await User.findOne({email: email}) .populate({
        path: "dbs",
        select: { '_id': 1 , "name" :1},
        populate: {
            path: "org_id",
            model: "Organization",
            select: { '_id': 1 , "name" :1},
        }
    });
    return user;
}

module.exports={getAllUser,getUserById,saveUser,updateUser,deleteDbInUser,deleteUserById,getUser,getUserByEmail,addDbIdInUSerSchema}