// // const { Client } = require('pg');      
// const {getById} = require('../db_services/dbDbService')

// app.post('/create-table', async (req, res) => {
//   // Extract the database name and table name from the request
//   const db_id = req?.body?.id;
//   const tableName = req?.body?.tableName;
//   const data = await getById(db_id);
//   console.log(data);
//   // Connect to the PostgreSQL database server
//   const client = new Client({
//     host: 'localhost',
//     user: 'postgres',
//     password: 'root',
//     database: databaseName
//   });
//   await client.connect();

//   // Execute the SQL statement to create the table
//   try {
//     console.log('start')
//     await client.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY)`);
//     console.log('mid')

//     res.status(200).json({ message: `Table '${tableName}' created successfully` });
//     console.log('third')
//   } catch (err) {
//     res.status(400).json({ message: `Error creating table: ${err.message}` });
//   } finally {
//     // Close the connections
//     await client.end();

//   }
// });