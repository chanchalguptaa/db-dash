const {getDbById} = require("../db_services/masterDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const checkAuthKey = async (req,res,next)=>{
  // next();
  try {
    const authkey =  req?.headers['key'];
    console.log("Authkey : ",authkey);
    const db_id = req?.params?.dbId
    console.log("db_id : ",db_id);
    const tableName = req?.params?.tableName
    console.log("tableName : ",tableName)
    const data = await getDbById(db_id)
    console.log("Data : ",data)
    try {
            console.log("Auth_keys : ",data.auth_keys[`${authkey}`]);
            if(!(data.auth_keys[`${authkey}`]))
            {
                return res.status(400).json(prepareErrorResponse({ message: "Invalid token"}));
            }
            if(data.authKeys[`${authkey}`].access==1){
              if(scope==='write')
              {
                 next();
              }
              else if(scope==='read' && req.method==='GET'){
                next();
              } else{
                return res.status(400).json(prepareErrorResponse({ message: "Invalid req call"}));
              }
            }
            else{
                if(data.authKeys[`${authkey}`].access[`${tableName}`]){
                  if(scope==='write')
                  {
                     next();
                  }
                  else if(scope==='read' && req.method==='GET'){
                    next();
                  } else{
                    return res.status(400).json(prepareErrorResponse({ message: "Invalid request call"}));
                  }
                } else{
                    return res.status(400).json(prepareErrorResponse({ message: "Invalid token"}));
                }
            }
    } catch (err) {
        console.log("Error : ",err)
        return res.status(400).json(prepareErrorResponse({ message: `Something error in server${err.message}` }));
    }
  } catch (err) {
    return res.status(400).json(prepareErrorResponse({ message: `Invalid token ${err.message}` }));
  }
}

module.exports ={checkAuthKey}
