const db = require("../models/dbModel")

async function getField(id, fieldData) {
    return await db.find(
        { _id: id },
        { [`tables.${fieldData.table_name}.fields.${fieldData.field_name}`]: 1 }
    )
}


async function deleteView(id, tableName, viewName) {
    return await db.updateOne(
        { _id: id },
        {
            $unset: {
                [`tables.${tableName}.view.${viewName}`]: 1
            }
        }
    )
}

async function deleteFieldInView(id, tableName, viewData) {

    return await db.updateOne(
        { _id: id },
        {
            $unset: {
                [`tables.${tableName}.view.${viewData.view_name}.fields.${viewData.field_name}`]: 1
            }
        }
    )
}


async function saveView(id, tableName, view, fieldData) {
    return await db.updateOne(
        { _id: id },
        {
            $set: {
                [`tables.${tableName}.view.${fieldData.table_name}.fields.${fieldData.field_name}`]: view
            }
        }
    )
}


module.exports = {getField,deleteView,deleteFieldInView,saveView}