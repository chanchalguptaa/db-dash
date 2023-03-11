const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const {addTable,updateTableInDb,deleteTableInDb} = require("../db_services/tableDbService");
const tableService = require("../sql_db_services/tableService.js")
const {getDbById} = require("../db_services/masterDbService")
const {renameView} = require("../db_services/viewDbService");
const { nanoid } = require("nanoid");
const createTable = async (req, res) => {
     const db_id = req?.params?.dbId;
     const tableName = req?.body?.tableName;
     const fieldId = "tbl" + nanoid(6);
     try {
          const data = await getDbById(db_id);
          const ans = await tableService.createTableService(fieldId, data)
          try {
               const data1 = await addTable(db_id, tableName,fieldId)
               console.log("data1",data1)
               return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully` }))
          }
          catch (err) {
               console.log(err)
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
          const data = await getDbById(db_id);
          const view = data.tables[`${tableName}`].view;
          let rowData={}
           try {              
               rowData['tableData'] = await tableService.getTableService(tableName,data);
               if("view" in data.tables[tableName]){
                    let viewData = {};
                    for (const viewName in view) {
                         const viewFields = Object.keys(view[viewName].fields);
                          viewData[viewName] = viewFields;
                    }    
                    rowData['viewData'] = await tableService.getDatafromView(viewData,data)                  
               }
               return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' get successfully`,data:rowData}))
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
     const tableName = req?.params?.tableName;
     const data = await getDbById(db_id);
     const views = Object.keys(data.tables);
     try {
          const data = await getDbById(db_id);
          try {
               const ans = await tableService.updateTableService(tableName,newTableName,data);
               await updateTableInDb(db_id,newTableName,tableName) ;
               views.forEach(async (view) => {
                    if(data?.tables?.[view]?.view?.[tableName])
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
     const tableName = req?.params?.tableName;
     try {

          const data = await getDbById(db_id);
          
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