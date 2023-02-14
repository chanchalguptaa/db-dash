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
    console.log("first")
  const client = createClient(data);
  console.log("second")
  await client.connect();
  console.log("third")
  const ans = await client.query(`ALTER TABLE ${tableName} RENAME TO ${newTableName}`);
  console.log(ans)
  await client.end();
  return ans;
}
catch (err)
{
  console.log(err.messege)
  throw err ;
  
}
}

const deleteTableService = async (tableName,data)=>{
  try {
  const client = createClient(data);
  await client.connect();
  const ans = await client.query(`DROP TABLE ${tableName} (id SERIAL PRIMARY KEY)`);
  await client.end();
  return ans;
}
catch (err)
{
  throw err ;
}
}

module.exports = {createTableService,updateTableService}
