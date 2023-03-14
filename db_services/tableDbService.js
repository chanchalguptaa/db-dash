const db = require("../models/dbModel")

async function addTable(id, tableName,tableId) {
    var obj = {
        "tableName":tableName,
        "fields":{}
    }
    const data = await db.findOneAndUpdate(
        { _id: id },
        {
            $set: { [`tables.${tableId}`]: obj },
        }
    )
    return data;
}


async function updateTableInDb(id, newTableName, oldTableName) {
    return await db.findOneAndUpdate(
        { _id: id },
        {
            $set: { [`tables.${oldTableName}.tableName`]:  newTableName }
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