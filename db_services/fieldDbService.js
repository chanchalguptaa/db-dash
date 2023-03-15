const db = require("../models/dbModel")

async function addField(id, tableName, fieldName, fieldType,fieldId) {
    var json =  {
        "fieldType":fieldType,
        "fieldName": fieldName
    }
    const obj = await db.findOneAndUpdate(

        { _id: id },

        {
            $set: { [`tables.${tableName}.fields.${fieldId}`]: json }
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

    if (newFieldType) {
        const obj = await db.findOneAndUpdate(
            { _id: id },
            { $set: { [`tables.${tableName}.fields.${oldFieldName}.fieldType`]:  newFieldType  } 
        }
    );
    
    }

    if (newFieldName) {
        const obj = await db.findOneAndUpdate(
            { _id: id }
            , {
                $set: { [`tables.${tableName}.fields.${oldFieldName}.fieldName`]: newFieldName}
            }
        );
        return obj;

    }
   
    
}



module.exports = {addField,deletefield,updatefield}