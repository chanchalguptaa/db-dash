const { create } = require("lodash");
const { ObjectId } = require('mongodb');

const Org = require("../models/organizationModel")
async function getAllOrgs() {
    return await Org.find();
}

async function getOrgById(id) {
    return await Org.findById(id).populate("users.user_id")
}

async function saveOrg(orgname, user_id) {
    return await Org.create({
        name: orgname,
        users: { user_id: user_id, user_type: "admin" }
    });
}
async function updateOrgTitle(id, org) {
    const options = { new: true };
    try {
        return await Org.findByIdAndUpdate(id, org, options)
    } catch (error) {
        console.log(error);
    }
}


async function userRole(orgId, userId) {
    try{
        const orgDoc = await Org.findOne({ _id: orgId });
        const user = orgDoc.users.find(u => u.user_id._id==userId);
        return  user?.user_type;
    }catch(error)
    {
        console.log(error)
        throw error;
    }
 
  }

async function deleteOrgById(id) {
    return await Org.findByIdAndDelete(id)
}
async function addUserInOrg(org_id, user) {
    return await Org.updateOne(
        { _id: org_id },
        { $push: { users: user } }
    )
}
async function removeUserInOrg(org_id, user) {
    return await Org.updateOne(
        { _id: org_id },
        { $pull: { "users": { user_id: user } } },
    )

}


module.exports = { getAllOrgs, getOrgById, saveOrg, updateOrgTitle, deleteOrgById, addUserInOrg, removeUserInOrg, userRole }
