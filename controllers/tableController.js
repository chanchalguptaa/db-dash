const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const sqlDbService = require("../sql_db_services/databaseService")
const {addTable,getById} = require("../db_services/masterDbService");
const { Client } = require('pg');
const createTable = async (req,res)=>{
    try{
         const db_id = req?.body?.id;
         const tableName = req?.body?.tableName;
         const data = await getById(db_id);
         const client = new Client({
         host: 'localhost',
         user: 'postgres',
         password: 'root',
         database: data.name+"_"+data?.org_id
         });
         await client.connect();
         try {
             await client.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY)`);
             
             res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully`}))
         }
         catch (err) {
             res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
         }
         finally {
             await client.end();
         }
    }
    catch(err){
         res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
    }
    
 }
module.exports ={createTable}