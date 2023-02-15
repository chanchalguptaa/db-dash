const dbService = require("../db_services/masterDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const filterService = require("../sql_db_services/filterService")

const createFilter = async (req, res) =>{
    try{
        const dbId = req.params.dbId;
        const tableName = req.params.tableName;
        const query = req.body.query;
        const filterName = req.body.filterName;
        const data = await dbService.getById(dbId);
        const ans = await filterService.runQuery(query,data);
       try {
           const data1 = await dbService.addQuery(dbId,query,filterName,tableName)
             return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully` }))
       }
      catch (err) {
           return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
       }
        
    }catch(err){
          return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));       
    }
}

module.exports = {createFilter}