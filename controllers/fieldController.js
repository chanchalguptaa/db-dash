const { prepareErrorResponse,generateIdentifier, prepareSuccessResponse } = require("../services/utilityService.js");
const {getDbById} = require("../db_services/masterDbService")
const {addField,deletefield,updatefield} = require("../db_services/fieldDbService")
const fieldService = require("../sql_db_services/fieldService.js")
const {updateView} = require("../db_services/viewDbService")
const db=require("../models/dbModel")


const createField = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    const fieldName = req?.body?.fieldName;
    const fieldType = req?.body?.fieldType;
    const fieldId = "fld" + generateIdentifier(6);
    //field name is no more id ..  however previous fieldname will be there id 
    try {
         const data = await getDbById(db_id);
         
         const ans = await fieldService.createFieldService(tableName, fieldName,fieldType,data,fieldId)
         try { 
                 const tmp=data?.tables?.[tableName].fields?.[fieldName]||null;
                 if(!tmp)  
               {  
                    const data1=await addField(db_id,tableName,fieldName,fieldType,fieldId);
               }
               else
              { 
                   return res.status(404).json(prepareErrorResponse({ message: `Field ${fieldName}  not exits in  table ${tableName}` }))
              }

              return res.status(200).json(prepareSuccessResponse({ message: `Field '${fieldName}' created successfully` }))
         }
         catch (err) {
                         return res.status(400).json(prepareErrorResponse({ message: `Error creating field ${err.message}` }));
                     }
    }
    catch (err) {
                   return res.status(400).json(prepareErrorResponse({ message: `Error creating field ${err.message}` }));
                 }

}

const deleteField = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    const fieldName = req?.params?.fieldName;
    try { 
         const data = await getDbById(db_id);
         const ans = await fieldService.deleteFieldService(tableName, fieldName,data)
         try {
            
              // delete from mongo
              const tmp=data?.tables?.[tableName].fields?.[fieldName]||null;
              if(tmp)  
                 { const data1 = await deletefield(db_id,tableName,fieldName);}
               else
               return res.status(404).json(prepareErrorResponse({ message: `Field ${fieldName}  not exits in  table ${tableName}` }))

          return res.status(200).json(prepareSuccessResponse({ message: `Field '${fieldName}' deleted successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error deleting field ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error deleting field ${err.message}` }));
    }

}
const getAllField =async (req, res) => {
     const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    try { 
         const data = await getDbById(db_id);
         try {
              if(data.tables[tableName])  
              return res.status(200).json(prepareSuccessResponse({ data : data.tables[tableName] ,  message: `Field '${tableName}' get successfully` }))
               else
               return res.status(404).json(prepareErrorResponse({ message: `table ${tableName}  not exits in  db ` }))


         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error getting field ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error getting field ${err.message}` }));
    } 
}

const updateField = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    const fieldName = req?.params?.fieldName; //fieldName refers to field id 
    const newFieldName = req?.body?.newFieldName;
    const newFieldType = req?.body?.newFieldType;
    try {
         const data = await getDbById(db_id);
         const tableNames = Object.keys(data.tables);
         const ans = await fieldService.updateFieldService(tableName, fieldName,newFieldName,newFieldType,data)
         if(tableName &&(fieldName || newFieldType)){
             try {
               const data1 =  await updatefield(db_id, tableName, fieldName, newFieldName, newFieldType)
               tableNames.forEach(async (view) => {
                         
                    if(data?.tables?.[view]?.view?.[tableName])
                    {
                         await updateView(db_id, tableName, fieldName, newFieldName, newFieldType,view)
                    }
                  });
             } catch (error) {
               return res.status(400).json(prepareErrorResponse({ message: `Error updating field ${error.message}` }));
          }
         }
         try {
              return res.status(200).json(prepareSuccessResponse({ message: `Field '${fieldName}' updated successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error updating field ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error updating field ${err.message}` }));
    }

}
module.exports = { createField,deleteField,updateField,getAllField}