const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const {addTable,updateTableInDb,deleteTableInDb} = require("../db_services/tableDbService");
const tableService = require("../sql_db_services/tableService.js")
const {getById} = require("../db_services/masterDbService")
const {renameView} = require("../db_services/viewDbService")
const createTable = async (req, res) => {
     const db_id = req?.params?.dbId;
     const tableName = req?.body?.tableName;

     try {
          const data = await getById(db_id);
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
const getTable = async (req, res) => {
     const db_id = req?.params?.dbId
     const tableName = req?.params?.tableName;
     try {

          const data = await getById(db_id);
          
           try {              
               const ans = await tableService.getTableService(tableName,data);
               console.log("AAA "+ans)
               return res.send(ans)
               // return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' get successfully`}))
           }
           catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error geting table ${err.message}` }));
           }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error geting table ${err.message}` }));
     }

}

const updateTable = async (req, res) => {
     const db_id = req?.params?.dbId
     const newTableName = req?.body?.newTableName;
     const tableName = req?.body?.tableName;
     const data = await getById(db_id);
     const views = Object.keys(data.tables);
     try {
          const data = await getById(db_id);
          try {
               const ans = await tableService.updateTableService(tableName,newTableName,data);
               await updateTableInDb(db_id,newTableName,tableName) ;
               views.forEach(async (view) => {
                    await renameView(db_id,tableName,newTableName,view)                  
               });
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
          
           try {              
               const ans = await tableService.deleteTableService(tableName,data);
               await deleteTableInDb(db_id,tableName);
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

module.exports = { createTable,getTable, updateTable,deleteTable }