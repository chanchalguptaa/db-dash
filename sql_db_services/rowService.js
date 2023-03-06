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
const getRowService = async (tableName,query,data)=>{
  console.log("query",query)
  var pgQuery  = 'SELECT '
  if(query.fields){
    pgQuery = pgQuery + query.fields  + ' from ' + tableName
  }
  else{
    pgQuery = pgQuery + '*' + ' from ' + tableName
  }
  if(query.filter){
    pgQuery = pgQuery + ' WHERE ' + query.filter ;
  }
  var sort  = '';
  if(query.sort){
    if(Array.isArray(query.sort)){
    query.sort.forEach(element => {
      var s = element.split(',')
      sort = sort + ' ' + s[0]+ ' ' + s[1] + ',';
      
    });
    sort = sort.substring(0,sort.length-1);
  }else{
    sort = query.sort.replaceAll(','," ");
  }
    pgQuery = pgQuery + ' ORDER BY ' + sort;
  }
 
  try {
  const client = createClient(data);
  await client.connect();
  // console.log(pgQuery)
  const ans = await client.query( pgQuery);
  await client.end();
  return ans.rows;
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

module.exports = {inserRowService,getRowService,deleteRowService,updateRowService}