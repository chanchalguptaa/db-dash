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
    throw err ;
}
}


const updateTableService = async (tableName,newTableName,data)=>{
  try {
  const client = createClient(data);
  await client.connect();
  const ans = await client.query(`ALTER TABLE ${tableName} RENAME TO ${newTableName}`);
  await client.end();
  return ans;
}
catch (err)
{
  throw err ;
  
}
}

const deleteTableService = async (tableName,data)=>{
  try {
  const client = createClient(data);
  await client.connect();
  const ans = await client.query(`DROP TABLE ${tableName}`);
  await client.end();
  return ans;
}
catch (err)
{
  throw err ;
}
}

module.exports = {createTableService,updateTableService,deleteTableService}
