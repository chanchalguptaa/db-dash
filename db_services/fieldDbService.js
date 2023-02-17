const db = require("../models/dbModel")

async function addField(id, tableName, fieldName, fieldType) {
    const obj = await db.findOneAndUpdate(

        { _id: id },

        {
            $set: { [`tables.${tableName}.fields.${fieldName}.fieldType`]: fieldType }
        }

    )
}


async function deletefield(id, tableName, fieldName) {
    const obj = await db.findOneAndUpdate(
        { _id: id },
        {
            $unset: { [`tables.${tableName}.fields.${fieldName}`]: 1 }
        }
    );
    return obj;
}

async function updatefield(id, tableName, oldFieldName, newFieldName, newFieldType) {
    if (newFieldName) {
        const obj = await db.findOneAndUpdate(
            { _id: id }
            , {
                $rename: { [`tables.${tableName}.fields.${oldFieldName}`]: `tables.${tableName}.fields.${newFieldName}` }
            }
        );

    }
    if (newFieldType) {
        const obj = await db.findOneAndUpdate({ _id: id }, { $set: { [`tables.${tableName}.fields.${oldFieldName}.fieldType`]: { "fieldType": newFieldType } } });
    }
    return;
}

module.exports = {addField,deletefield,updatefield}