const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getById } = require("../db_services/masterDbService");
const { insertAuthKey, deleteAuthKeyInDb } = require("../db_services/authKeyDbService")

const createAuthKey = async (req, res) => {
    const db_id = req?.params?.dbId;
//     const tableName =  req?.body?.tableName;
    const access = req?.body?.access
    try {
         const data = await getById(db_id);
     //     console.log(data);
         const data1 = await insertAuthKey(db_id,access)
        //  const ans = await rowService.inserRowService(tableName,columAndData,data)
         try {
              return res.status(200).json(prepareSuccessResponse({ message: `insert authkey successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error creating row ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error creating row ${err.message}` }));
    }

}

const deleteAuthKey = async (req, res) => {
    const db_id = req?.params?.dbId;
    const authKey =  req?.params?.authkey;
    try {
         const data = await getById(db_id);
         console.log(data);
         const data1 = await deleteAuthKeyInDb(db_id,authKey)
        //  const ans = await rowService.inserRowService(tableName,columAndData,data)
         try {
              return res.status(200).json(prepareSuccessResponse({ message: `delete authkey successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error deleting row ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error deleting row ${err.message}` }));
    }

}

    module.exports = {createAuthKey,deleteAuthKey}