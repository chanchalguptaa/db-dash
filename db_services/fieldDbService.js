const db = require("../models/dbModel")

async function addField(id, tableName, fieldName, fieldType) {
    const obj = await db.findOneAndUpdate(

        { _id: id },

        {
            $set: { [`tables.${tableName}.fields.${fieldName}.fieldType`]: fieldType }
        }

    )
    return obj
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

    console.log("inside updatefield in view db service");

    if (newFieldType) {
        const obj = await db.findOneAndUpdate(
            { _id: id },
            { $set: { [`tables.${tableName}.fields.${oldFieldName}.fieldType`]: { "fieldType": newFieldType } } 
        }
    );
    
    }

    if (newFieldName) {
        const obj = await db.findOneAndUpdate(
            { _id: id }
            , {
                $rename: { [`tables.${tableName}.fields.${oldFieldName}`]: `tables.${tableName}.fields.${newFieldName}` }
            }
        );
        return obj;

    }
   
    
}



module.exports = {addField,deletefield,updatefield}