const { findOneAndUpdate } = require("../models/dbModel")
const db = require("../models/dbModel")

async function saveDb(dbData) {
    return await dbData.save()
}

async function getDbs() {
    return await db.find()
}

async function getDbById(id) {
    return await db.find({
        _id: id
    })
}

async function getDbByOrgId(org_id) {
    return await db.find({ org_id: org_id })
}

async function getById(id) {
    return await db.findById(id)
}

async function deleteDb(id) {
    return await db.findByIdAndDelete(id)
}
async function addTable(id, tableName) {
    const data = await db.findOneAndUpdate(
        { _id: id },
        {
            $set: { [`tables.${tableName}`]: {} },
        }
    )
    return data;
}

async function updateTableInDb(id, newTableName, oldTableName) {
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $rename: { [`tables.${oldTableName}`]: `tables.${newTableName}` }
        }
    )
}
async function renameDb(id, newDb) {
    return await db.findByIdAndUpdate(id, newDb)
}

// field operation

async function addField(id, tableName, fieldName, fieldType) {
    const obj = await db.findOneAndUpdate(

        { _id:id },

        {
            $set: { [`tables.${tableName}.fields.${fieldName}.fieldType`]: fieldType }
        }

    )
}

async function deletefield(id,tableName,fieldName)
 {   
      const obj=await  db.findOneAndUpdate(
        {_id:id},
         {
            $unset:{[`tables.${tableName}.fields.${fieldName}`]:1}
         }
    );
      return obj;
 }

 async function updatefield(id,tableName,oldFieldName,newFieldName,newFieldType)
 {    if(newFieldName)
        {
            const obj=await  db.findOneAndUpdate(
                {_id:id}
                ,{
                    $rename:{[`tables.${tableName}.fields.${oldFieldName}`]:`tables.${tableName}.fields.${newFieldName}`}
                }
                );
        
        }
      if(newFieldType)
        {
            const obj=await  db.findOneAndUpdate({_id:id},{$set:{[`tables.${tableName}.fields.${oldFieldName}.fieldType`]:{"fieldType":newFieldType}}});
        }  
        return ;
 }






module.exports = { saveDb, getDbs, deleteDb, renameDb, getById, getDbByOrgId, addTable, getDbById, updateTableInDb, addField,deletefield,updatefield }