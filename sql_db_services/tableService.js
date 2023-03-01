const { Client } = require('pg');

const createClient = (data) => {
  const db_name = data?.name.toLowerCase();
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: db_name+"_"+data?.org_id
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


const getTableService = async (tableName,data)=>{
  try {
  const client = createClient(data);
  await client.connect();
  const ans = await client.query(`SELECT * FROM ${tableName}`);
  await client.end();
  return ans.rows;
}
catch (err)
{
  throw err ;
}
}


const getDatafromView = async(viewData,data)=>{
  try {
    const client = createClient(data);
    await client.connect();
    const viewRowData={}
    for (const viewName in viewData) {
      const fields = viewData[viewName];
      const selectQuery = `SELECT ${fields.join(', ')} FROM ${viewName}`;
      const ans = await client.query(selectQuery);
      viewRowData[viewName] = ans.rows;
    }
    await client.end();
    return viewRowData;
  } catch (error) {
    throw error ;
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

module.exports = {createTableService,getTableService,updateTableService,deleteTableService,getDatafromView}
