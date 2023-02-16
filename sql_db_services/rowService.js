const { Client } = require('pg');

const createClient = (data) => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: data?.name+"_"+data?.org_id
  });
};

const inserRowService = async (tableName,column1,column2,column3,column4,value1,value2,value3,value4,data)=>{
    try {
    const client = createClient(data);
    await client.connect();
    console.log('first')
    const ans = await client.query(`INSERT INTO ${tableName}(${column1},${column2},${column3},${column4}) VALUES(${value1},${value2},${value3},${value4});`);
    console.log('second')
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