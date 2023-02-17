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
    // console.log("s",s);
    console.log("columnAndData",columnAndData);
    // var keyss = Object.keys(columnAndData)
    var columnStr="";
    var valuesStr="";
    for (const key of Object.keys(columnAndData)) {

        if(s[key].fieldType !== "integer")
        { 
          // console.log("columnAndData.key",columnAndData[key])
          columnAndData[key] = "'" + columnAndData?.[key] +"'"
          valuesStr = valuesStr+ columnAndData[key] +","
        }
        else{
          valuesStr = valuesStr+ columnAndData[key] +","
        }
        columnStr = columnStr+ key +","
        
        // console.log(s[key].fieldType);
    }
    // columnStr.split()
    columnStr = columnStr.substr(0,columnStr.length-1);
    valuesStr = valuesStr.substr(0,valuesStr.length-1);
    console.log(" new columnAndData",columnAndData);
    console.log("columnStr",columnStr)
    console.log("valuestr",valuesStr)
    await client.connect();
    // console.log('first')
    const ans = await client.query(`INSERT INTO ${tableName}(${columnStr}) VALUES(${valuesStr});`);
    // console.log('second')
    await client.end();
    return ans;
}
catch (err)
{
    console.log(err)
    throw err ;
}
}

module.exports = {inserRowService}