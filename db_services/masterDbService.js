const db = require("../models/dbModel")

async function saveDb(dbData){
    return await dbData.save()
}

async function getDbs(){
    return await db.find()
}

async function getDbByOrgId(org_id){
    return await db.find({ org_id:org_id })
}

async function getById(id){
    return await db.findById(id)
}

async function deleteDb(id){
    return await db.findByIdAndDelete(id)
}
async function addTable(id,table){
    return await db.updateOne(
        { _id:id},
        { $set: { "tables" :   table  } }    
     )
}

async function renameDb(id,newDb){
    return await db.findByIdAndUpdate(id,newDb)
}
module.exports = {saveDb,getDbs,deleteDb,renameDb,getById,getDbByOrgId,addTable}