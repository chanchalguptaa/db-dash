// const client = require("../services/pgService");
const { Client } = require('pg');

const createDb = async (req, res) => {
    const client = new Client({
        host: 'localhost',
        user: 'postgres',
        password: 'root',
        database: 'postgres'
      });
    await client.connect();
    const databaseName = req.body.databaseName;

    try {
        const s = await client.query(`CREATE DATABASE ${databaseName}`);
        res.status(200).json({ message: `Database '${databaseName}' created successfully` });
    } catch (err) {
        res.status(400).json({ message: `Error creating database: ${err.message}` });
    } finally {
        // Close the connection
        await client.end();
    }
    
}

const deleteDb = async (req, res) => {
    const client = new Client({
        host: 'localhost',
        user: 'postgres',
        password: 'root',
        database: 'postgres'
      });
    await client.connect();
    console.log('111')
    const databaseName = req.body.databaseName;

    try {
        console.log('222') 
        await client.query(`DROP DATABASE IF EXISTS ${databaseName}`);
        console.log('333') 
        res.status(200).json({ message: `Database '${databaseName}' deleted successfully` });
      } catch (err) {
        res.status(400).json({ message: `Error deleting database: ${err.message}` });
      } finally {
        // Close the connection
        await client.end();
      }
}


module.exports = { createDb,deleteDb }