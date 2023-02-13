const { Client } = require('pg');
const createClient = () => {
  return new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root'
  });
};

async function createDatabase(dbName) {
  const client = createClient();
  await client.connect();
  console.log('Connected!');
  const sql = `CREATE DATABASE ${dbName}`;
  await client.query(sql);
  console.log(`Database ${dbName} created`);
  await client.end();
  return `postgres://${client.user}:${client.password}@${client.host}/${dbName}`;
}

async function dropDatabase(dbName){
  const client = createClient();
  await client.connect();
  console.log('Connected!');
  const sql = `DROP DATABASE ${dbName}`;
  await client.query(sql);
  console.log(`Database ${dbName} droped`);
  await client.end();
}

async function renameDatabase(oldName,newName){
  const client = createClient();
  await client.connect();
  console.log('Connected!');
  const sql =`ALTER DATABASE ${oldName} RENAME TO ${newName};`;
  await client.query(sql);
  console.log(`Database renamed ${oldName} to ${newName}`);
  await client.end()
  return `postgres://${client.user}:${client.password}@${client.host}/${newName}`;
}

module.exports = {createDatabase,dropDatabase,renameDatabase};
