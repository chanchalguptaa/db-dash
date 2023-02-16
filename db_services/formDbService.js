const form = require("../models/formModel")
const db = require("../models/dbModel")

async function saveForm(form){
   return await form.save()
}
async function createFormInDb(id,tableName,formId,){
    const data =  await db.updateOne(
        { _id:id},
        { $push: {  [`tables.${tableName}`]: formId } }
    )
        return data;
}
async function deleteDbById(db_id){
    return await form.findByIdAndDelete(db_id)
}
async function deleteFormByDbId(id){
      { _id:id }
    return await form.findByIdAndDelete(id)
}
module.exports = {saveForm,createFormInDb,deleteDbById,deleteFormByDbId}
