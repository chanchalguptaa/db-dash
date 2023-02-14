// const dbService = require("../db_services/dbDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const sqlDbService = require("../sql_db_services/databaseService") 
const {getById} = require("../db_services/masterDbService")
const Db = require("../models/dbModel")
const { Client } = require('pg'); 
const Database = require('../models/dbModel')     

const createTable = async (req,res)=>{
    const db_id = req?.body?.id;
    const tableName = req?.body?.tableName;
    console.log
    const data = await getById(db_id);
    console.log(data);
    // Connect to the PostgreSQL database server
    const client = new Client({
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      database: data.name+"_"+data.org_id
    });
    await client.connect();
  
    try {
      console.log('start')
      await client.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY)`);
      console.log('mid')
       
      
      
      res.status(200).json({ message: `Table '${tableName}' created successfully` });
      console.log('third')
    } catch (err) {
      res.status(400).json({ message: `Error creating table: ${err.message}` });
    } finally {
      // Close the connections
      await client.end();
  
    }
}
module.exports ={createTable}