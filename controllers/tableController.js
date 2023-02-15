const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { addTable, getById ,updateTableInDb} = require("../db_services/masterDbService");
const tableService = require("../sql_db_services/tableService.js")
const createTable = async (req, res) => {
     const db_id = req?.params?.dbId;
     const tableName = req?.body?.tableName;

     try {
          const data = await getById(db_id);
          console.log("data in create table ", data);
          const ans = await tableService.createTableService(tableName, data)
          try {
               const data1 = await addTable(db_id, tableName)
               return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully` }))
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
     }

}

const updateTable = async (req, res) => {
     const db_id = req?.params?.dbId
     const newTableName = req?.body?.newTableName;
     const tableName = req?.body?.tableName;
     try {
          const data = await getById(db_id);
          try {
               const ans = await tableService.updateTableService(tableName,newTableName, data);
               await updateTableInDb(db_id,newTableName,tableName) ;
               return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' updated successfully`}))
           }
           catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error updating table ${err.message}` }));
           }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error updating table ${err.message}` }));
     }

}


const deleteTable = async (req, res) => {
     const db_id = req?.params?.dbId
     const tableName = req?.body?.tableName;
     try {

          const data = await getById(db_id);
          const ans = await tableService.deleteTableService(tableName,data)
           try {
          //     const data1 = await addTable(db_id,tableName)
               return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' delete successfully`}))
           }
           catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error deleting table ${err.message}` }));
           }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error deleting table ${err.message}` }));
     }

}

module.exports = { createTable, updateTable,deleteTable }