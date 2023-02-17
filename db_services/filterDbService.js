const db = require("../models/dbModel")

async function addQuery(id,query,filterName,tableName){
    const data =  await db.findOneAndUpdate (
        { _id:id},
        {
         $set: { [`tables.${tableName}.filters.${filterName}.query`] : query} ,
        }
    )
        return data;
}

async function updateFilterNameInDb(id,oldFilterName,filterName,tableName){
    return await  db.findOneAndUpdate (
         { _id:id},
         { 
             $rename: { [`tables.${tableName}.filters.${oldFilterName}`] : `tables.${tableName}.filters.${filterName}` } 
         }
     )
 }


 async function deleteFilterNameInDb(id,filterName,tableName){
    return await db.findOneAndUpdate(
        {
            _id:id
        },
        {
            $unset:{[`tables.${tableName}.filters.${filterName}`]:""}
        }
    )
}

async function updateQuery(id,filterName,tableName,query){
    return await  db.findOneAndUpdate (
        { _id:id},
        {
            $set: { [`tables.${tableName}.filters.${filterName}.query`] : query} 
        }
    )
}
module.exports = {addQuery,updateFilterNameInDb,deleteFilterNameInDb,updateQuery}

