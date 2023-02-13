const Org = require("../models/organizationModel")
async function getAllOrgs(){
    return await Org.find();
}

async function getOrgById(id){
    return await Org.findById(id).populate("users");
}

async function saveOrg(org){
    await org.save()
}
async function updateOrgTitle(id,org){
    const options = { new: true };
    try {
        return await Org.findByIdAndUpdate(id,org,options)
    } catch (error) {
        console.log(error);
    }
}

async function deleteOrgById(id){
    return await Org.findByIdAndDelete(id)
}
async function addUserInOrg(org_id,user){
    return await Org.updateOne(
        { _id:org_id},
        { $push: { users: user} }
     )
}

module.exports={getAllOrgs,getOrgById,saveOrg,updateOrgTitle,deleteOrgById,addUserInOrg}
