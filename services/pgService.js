const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'postgres'
  });

module.exports= client
