const db = require("../models/dbModel")

async function saveDb(dbData){
    return await dbData.save()
}

async function getDbs(){
    return await db.find()
}

async function getDbById(id)
{
    return await db.find({
        _id:id
    })
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
async function addTable(id,tableName){
    const data =  await db.findOneAndUpdate (
        { _id:id},
        {
         $set: { [`tables.${tableName}`] : {}} ,
        }
    )
        return data;
}

async function renameDb(id,newDb){
    return await db.findByIdAndUpdate(id,newDb)
}

async function saveView(id,tableName,view,tableData){
    return await db.updateOne(
        {_id:id},
        {
            $set: {
                [`tables.${tableName}.view.${tableData}`]:view
              }
        }
    )
}  

async function deleteView(id,tableName,viewName){
    // { _id: ObjectId("63ecb964841ba3176db83a9e") },  // filter by _id
    // { $unset: { "tables.teacher.view.hod": 1 } }   // remove hod view from teacher
    return await db.updateOne(
        {_id:id},
        {
            $unset: {
                [`tables.${tableName}.view.${viewName}`]:1
              }
        }
    )
}

async function getField(id,fieldData) {
    return await db.find(
        {_id:id},
        { [`tables.${fieldData.table_name}.fields.${fieldData.field_name}`] : 1 }
    )
}

module.exports = {saveDb,getDbs,deleteDb,renameDb,getById,getDbByOrgId,addTable,getDbById,saveView,getField,deleteView}