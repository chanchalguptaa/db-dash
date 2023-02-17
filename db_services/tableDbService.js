const db = require("../models/dbModel")

async function addTable(id, tableName) {
    const data = await db.findOneAndUpdate(
        { _id: id },
        {
            $set: { [`tables.${tableName}`]: {} },
        }
    )
    return data;
}


async function updateTableInDb(id, newTableName, oldTableName) {
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $rename: { [`tables.${oldTableName}`]: `tables.${newTableName}` }
        }
    )
}


async function deleteTableInDb(id, tableName) {
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $unset: { [`tables.${tableName}`]: "" }
        }
    )
}

module.exports = {addTable,updateTableInDb,deleteTableInDb}