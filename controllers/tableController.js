const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const {addTable,getById} = require("../db_services/masterDbService");
const tableService = require("../sql_db_services/tableService.js") 
const createTable = async (req,res)=>{
    const db_id = req?.params?.dbId;
    const tableName = req?.body?.tableName;

    try{
         const data = await getById(db_id);
         console.log("data in create table ",data);
         const ans = await tableService.createTableService(tableName,data)
         try {
            const data1 = await addTable(db_id,tableName)
             return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully`}))
         }
         catch (err) {
             return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
         }
    }
    catch(err){
         return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
    }
    
 }
module.exports ={createTable}