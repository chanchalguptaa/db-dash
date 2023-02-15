const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getById } = require("../db_services/masterDbService");
const fieldService = require("../sql_db_services/fieldService.js")

const createField = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.body?.tableName;
    const fieldName = req?.body?.fieldName;
    const fieldType = req?.body?.fieldType;
    try {
         const data = await getById(db_id);
         console.log("data in create table ", data);
         const ans = await fieldService.createFieldService(tableName, fieldName,fieldType,data)
         try {
            //   const data1 = await addTable(db_id, tableName)
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
    const tableName = req?.body?.tableName;
    const fieldName = req?.body?.fieldName;
    try {
         const data = await getById(db_id);
         console.log("data in create table ", data);
         const ans = await fieldService.deleteFieldService(tableName, fieldName,data)
         try {
            //   const data1 = await addTable(db_id, tableName)
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


const updateField = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.body?.tableName;
    const oldFieldName = req?.body?.oldFieldName;
    const newFieldName = req?.body?.newFieldName;
    const newFieldType = req?.body?.newFieldType;
    try {
         const data = await getById(db_id);
         console.log("data in create table ", data);
         const ans = await fieldService.updateFieldService(tableName, oldFieldName,newFieldName,newFieldType,data)
         console.log('third')
         try {
            //   const data1 = await addTable(db_id, tableName)
              return res.status(200).json(prepareSuccessResponse({ message: `Field '${oldFieldName}' updated successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error updating field ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error updating field ${err.message}` }));
    }

}
module.exports = { createField,deleteField,updateField }