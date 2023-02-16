const { Client } = require('pg');

const createClient = (data) => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: data?.name+"_"+data?.org_id
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