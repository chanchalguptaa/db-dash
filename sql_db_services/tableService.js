const { Client } = require('pg');

const createClient = (data) => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: data?.name+"_"+data?.org_id
  });
};

const createTableService = async (tableName,data)=>{
    try {
    const client = createClient(data);
    await client.connect();
    const ans = await client.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY)`);
    await client.end();
    return ans;
}
catch (err)
{
    throw new Error(e);
}
}

module.exports = {createTableService}