const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const sqlDbService = require("../sql_db_services/databaseService")
const {getById,addTable} = require("../db_services/masterDbService")
const Db = require("../models/dbModel")
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
            console.log("data111");
             const data = await addTable(db_id,{"1234":{tableName:tableName}})
             console.log("data",data);
            res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully`}))
        }
        catch (err) {
            console.log(err);
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