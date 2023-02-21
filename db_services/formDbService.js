const form = require("../models/formModel")
const db = require("../models/dbModel")

async function saveForm(form){
   return await form.save()
}
async function createFormInDb(id,tableName,formId){
    const data =  await db.updateOne(
        { _id:id},
        { $push: {  [`tables.${tableName}.forms`]: formId+"" } }
    )
        return data;
}

async function deleteFormByFormId(form_id){

    return await form.findByIdAndDelete(form_id)

}
async function deleteFormInDb(id,tableName,formId){
    // formId = "ObjectId('"+formId+"')"
    console.log(formId);
    const data =  await db.updateOne(
        { _id: id },    
        { $pull: {  [`tables.${tableName}.forms`]:formId } }
    )
    console.log(data);
        return data ;

}

async function addFieldInForm(field_name,id) {
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
module.exports = {saveForm,createFormInDb,deleteFormByFormId,addFieldInForm,removeFieldInForm,deleteFormInDb}
