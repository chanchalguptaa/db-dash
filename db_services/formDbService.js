const form = require("../models/formModel")
const db = require("../models/dbModel")

async function saveForm(form){
   return await form.save()
}
async function createFormInDb(id,tableName,formId){
    const data =  await db.updateOne(
        { _id:id},
        { $push: {  [`tables.${tableName}.forms`]: formId } }
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
async function addFieldInForm(field_name,id) {
    console.log(field_name,id)
    const addField = await form.updateOne(
        { _id:id },
            { $push:  {fields:field_name}  }        
    )
   
}
async function removeFieldInForm(field_name,id){
    const removeFiedld = await form.updateOne(
               {_id:id},
               {
                 $pull:  {fields:field_name} 
               }
        
    )
}
module.exports = {saveForm,createFormInDb,deleteDbById,deleteFormByDbId,addFieldInForm,removeFieldInForm}
