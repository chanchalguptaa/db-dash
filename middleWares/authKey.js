const {getById} = require("../db_services/masterDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const checkAuthKey = async (req,res,next)=>{
  try {
    const authkey =  req.headers['key']; 
    const db_id = req.params.dbId
    const tableName = req.params.tableName
    const data = await getById(db_id)
    const authKeys = Object.keys(data.authKeys);
    try {
            if(data.authKeys[`${authkey}`]){
            if(data.authKeys[`${authkey}`].access==1){
                next();
            } else{
                const tables = Object.keys(data.authKeys[`${authkey}`].access);
                if(data.authKeys[`${authkey}`].access[`${tableName}`]==1){
                   next();
                } else{
                    return res.status(400).json(prepareErrorResponse({ message: "Invalid token"}));
                }
            }
        } else{
            return res.status(400).json(prepareErrorResponse({ message: "Invalid token"}));

        }
    } catch (err) {
        return res.status(400).json(prepareErrorResponse({ message: `Something error in server${err.message}` }));

    }
  } catch (err) {
    return res.status(400).json(prepareErrorResponse({ message: `Invalid token ${err.message}` }));
  }
}

module.exports ={checkAuthKey}