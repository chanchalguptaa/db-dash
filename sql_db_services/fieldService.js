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


const deleteFieldService = async (tableName,fieldName,data)=>{
    try {
    const client = createClient(data);
    await client.connect();
    const ans = await client.query(`ALTER TABLE ${tableName} DROP COLUMN ${fieldName};`);
    await client.end();
    return ans;
}
catch (err)
{
    throw err ;
}
}


const updateFieldService = async (tableName,oldFieldName,newFieldName,newFieldType,data)=>{
    try {
    const client = createClient(data);
    await client.connect();
    console.log('first')
    const ans = await client.query(`ALTER TABLE ${tableName} RENAME COLUMN ${oldFieldName} TO ${newFieldName};`);
    console.log('second')
    await client.end();
    return ans;
}
catch (err)
{
    throw err ;
}
}

module.exports = { createFieldService,deleteFieldService,updateFieldService }