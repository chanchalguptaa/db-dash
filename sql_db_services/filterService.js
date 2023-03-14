const { Client } = require('pg');

const createClient = (data) => {
  const db_name = data?.name.toLowerCase();
  return new Client({
    host: process.env.PGHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: db_name+"_"+data?.org_id
  });
};


const runQuery = async(query,data)=>{
    const client = createClient(data);
    await client.connect();
    const { rows } = await client.query(query);
    await client.end();
    return rows;
}

module.exports = {runQuery}