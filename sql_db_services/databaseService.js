const { Client } = require('pg');
const createClient = () => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root'
  });
};

async function createDatabase(dbName) {
  try {
    const client = createClient();
    await client.connect();
    const sql = `CREATE DATABASE ${dbName}`;
    await client.query(sql);
    await client.end();
    return `postgres://${client.user}:${client.password}@${client.host}/${dbName}`;
  } catch (error) {
    throw error
  }
 
}

async function dropDatabase(dbName){
  const client = createClient();
  await client.connect();
  const sql = `DROP DATABASE ${dbName}`;
  await client.query(sql);
  await client.end();
}

async function renameDatabase(oldName,newName){
  const client = createClient();
  await client.connect();
  const sql =`ALTER DATABASE ${oldName} RENAME TO ${newName};`;
  await client.query(sql);
  await client.end()
  return `postgres://${client.user}:${client.password}@${client.host}/${newName}`;
}

module.exports = {createDatabase,dropDatabase,renameDatabase};
