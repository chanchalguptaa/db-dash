const { Client } = require('pg');

const createClient = (data) => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: data?.name+"_"+data?.org_id
  });
};

const createFieldService = async (tableName,fieldName,fieldType,data)=>{
    try {
    const client = createClient(data);
    await client.connect();
    const ans = await client.query(`ALTER TABLE ${tableName} ADD COLUMN ${fieldName} ${fieldType};`);
    await client.end();
    return ans;
}
catch (err)
{
    throw err ;
}
}

module.exports = { createFieldService }