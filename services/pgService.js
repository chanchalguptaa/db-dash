const { Client } = require('pg');

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

module.exports= client
