const db = require("../models/dbModel")

async function saveDb(dbData) {
    return await dbData.save()
}

async function getDbs() {
    return await db.find().populate('org_id')
}


async function getDbByOrgId(org_id) {
    return await db.find({ org_id: org_id })
}

async function getDbCountByOrgId(org_id){
    return await db.countDocuments({org_id:org_id})
}

async function deleteDbByOrgId(org_id){
    return await db.deleteMany({
        org_id: org_id 
    })
}

async function getDbById(id) {
    return await db.findById(id).lean()
}

async function deleteDb(id) {
    return await db.findByIdAndDelete(id)
}


async function renameDb(id, newDb) {
    return await db.findByIdAndUpdate(id, newDb)
}




module.exports = { saveDb, getDbs,deleteDbByOrgId, deleteDb, renameDb, getDbByOrgId, getDbById ,getDbCountByOrgId}
