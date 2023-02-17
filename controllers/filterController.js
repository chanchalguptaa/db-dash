const dbService = require("../db_services/masterDbService")
const filterDbService = require("../db_services/filterDbService");
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const filterService = require("../sql_db_services/filterService")

const createFilter = async (req, res) =>{
    try{
        const dbId = req?.params?.dbId;
        const tableName = req?.params?.tableName;
        const query = req?.body?.query;
        const filterName = req?.body?.filterName;
        const data = await dbService.getById(dbId);
        const ans = await filterService.runQuery(query,data);
       try {
           const data1 = await filterDbService.addQuery(dbId,query,filterName,tableName)
             return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully` }))
       }
      catch (err) {
           return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
       }
        
    }catch(err){
          return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));       
    }
}

const updateFilterName = async (req, res) => {
    const db_id = req?.params?.dbId
    const oldFilterName = req?.body?.oldFilterName;
    const filterName = req?.body?.filterName;
    const tableName = req?.params?.tableName
    try {
         try {
              const ans = await filterDbService.updateFilterNameInDb(db_id,oldFilterName,filterName,tableName ) ;
              return res.status(200).json(prepareSuccessResponse({ message: `Table '${filterName}' updated successfully`}))
          }
          catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error updating filter ${err.message}` }));
          }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error updating filter ${err.message}` }));
    }

}


const deleteFilter = async(req,res)=>{
    const db_id = req?.params?.dbId
    const filterName = req?.body?.filterName;
    const tableName = req?.params?.tableName
    try {
         try {
              const ans = await filterDbService.deleteFilterNameInDb(db_id,filterName,tableName ) ;
              return res.status(200).json(prepareSuccessResponse({ message: `Table '${filterName}' deleted successfully`}))
          }
          catch (err) {
            console.log(err)
              return res.status(400).json(prepareErrorResponse({ message: `Error delete filter ${err.message}` }));
          }
    }
    catch (err) {
        console.log(err)
         return res.status(400).json(prepareErrorResponse({ message: `Error delete filter ${err.message}` }));
    }
}


const updateQuery = async(req,res)=>{
    const db_id = req?.params?.dbId
    const filterName = req?.body?.filterName;
    const tableName = req?.params?.tableName;
    const query = req?.body?.query;
    try {
         try {
              const ans = await filterDbService.updateQuery(db_id,filterName,tableName,query) ;
              return res.status(200).json(prepareSuccessResponse({ message: `Query '${query}' deleted successfully`}))
          }
          catch (err) {
            console.log(err)
              return res.status(400).json(prepareErrorResponse({ message: `Error update query ${err.message}` }));
          }
    }
    catch (err) {
        console.log(err)
         return res.status(400).json(prepareErrorResponse({ message: `Error update query ${err.message}` }));
    }

}

module.exports = {createFilter,updateFilterName,deleteFilter,updateQuery}