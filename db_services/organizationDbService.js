const Org = require("../models/organizationModel")

async function getAllOrgs(){
    return await Org.find();
}

async function getOrgById(id){
    return await Org.findById(id)
}

async function saveOrg(org){
    await org.save()
}

async function updateOrg(id,org){

    try {
        return await Org.findByIdAndUpdate(id,org)
    } catch (error) {
        console.log(error);
    }
}

async function deleteOrgById(id){
    return await Org.findByIdAndDelete(id)
}

module.exports={getAllOrgs,getOrgById,saveOrg,updateOrg,deleteOrgById}