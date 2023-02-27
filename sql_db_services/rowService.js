const { Client } = require('pg');

const createClient = (data) => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: data?.name+"_"+data?.org_id
  });
};

const inserRowService = async (tableName,columnAndData,data)=>{
    try {
    const client = createClient(data);
    const s = data?.tables?.[tableName]?.fields;
  
    var columnStr="";
    var valuesStr="";
    for (const key of Object.keys(columnAndData)) {
        if(s[key].fieldType !== "integer")
        { 
          columnAndData[key] = "'" + columnAndData?.[key] +"'"
          valuesStr = valuesStr+ columnAndData[key] +","
        }
        else{
          valuesStr = valuesStr+ columnAndData[key] +","
        }
        columnStr = columnStr+ key +","
    }
    columnStr = columnStr.substr(0,columnStr.length-1);
    valuesStr = valuesStr.substr(0,valuesStr.length-1);
  
    await client.connect(); 
    const ans = await client.query(`INSERT INTO ${tableName}(${columnStr}) VALUES(${valuesStr});`);
    await client.end();
    return ans;
}
catch (err)
{
    throw err ;
}
}


const deleteRowService = async (tableName,row_id,data)=>{
  try {
  const client = createClient(data);
  await client.connect();
  const ans = await client.query(`DELETE FROM ${tableName} WHERE id = ${row_id};`);
  await client.end();
  return ans;
}
catch (err)
{
  throw err ;
}
}


const updateRowService = async (tableName,row_id,columnAndData,data)=>{
  try {
  const client = createClient(data);
  const s = data?.tables?.[tableName]?.fields;
  var columnStr="";
  var valuesStr="";
  for (const key of Object.keys(columnAndData)) {

      if(s[key].fieldType !== "integer")
      { 
        columnAndData[key] = "'" + columnAndData?.[key] +"'"
        valuesStr = valuesStr+ columnAndData[key] +","
      }
      else{
        valuesStr = valuesStr+ columnAndData[key] +","
      }
      columnStr = columnStr+ key +","
      
  }
  columnStr = columnStr.substr(0,columnStr.length-1);
  valuesStr = valuesStr.substr(0,valuesStr.length-1);
  await client.connect();
  const ans = await client.query( `UPDATE ${tableName} SET ${columnStr}=${valuesStr} WHERE id = ${row_id};`);
  await client.end();
  return ans;
}
catch (err)
{
  throw err ;
}
}

module.exports = {inserRowService,deleteRowService,updateRowService}