const { Client } = require('pg');

const createClient = (data) => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: data?.name+"_"+data?.org_id
  });
};

const createTable = async (tableName,data)=>{
    try {
        console.log("data",data);
    const client = createClient(data);
    await client.connect();
    console.log('Connected!');
    const ans = await client.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY)`);
    await client.end();
    return ans;
}
catch (e)
{
    throw e ;
}
}

module.exports = {createTable}
