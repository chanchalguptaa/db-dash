const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getDbById } = require("../db_services/masterDbService");
const { insertAuthKey, deleteAuthKeyInDb, updateAuthKeyInDb } = require("../db_services/authKeyDbService")

const createAuthKey = async (req, res) => {
     const db_id = req?.params?.dbId;
     const adminId = req?.params?.adminId
     var access = req?.body?.access
     var authObj = {}
     try {
          const data = await getDbById(db_id);
          if (access != 1) {
               if (!(Array.isArray(access)))
                    return res.status(404).json(prepareErrorResponse({ message: `Table name should be in array format` }));
               var allTablesAccess = {};
               var error = "false"
               access?.map(element => {
                    const tableName = data?.tables[element];
                    if (!tableName) {
                         error = "true";
                         return;
                    }
                    Object.assign(allTablesAccess, { [element]: {} });
               });
               if (error === "true")    
                    return res.status(404).json(prepareErrorResponse({ message: `Table doesnot exits in db` }));
               access = allTablesAccess;
          }
          authObj.access = access;
          authObj.name = req?.body?.name
          authObj.user = req?.body?.userId
          authObj.scope = req?.body?.scope
          authObj.createBy = adminId
          authObj.createDate = new Date()
          try {
               const data1 = await insertAuthKey(db_id, authObj)
               return res.status(200).json(prepareSuccessResponse({ message: `insert authkey successfully` }))
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
     }

}


const getAuthKeys = async (req,res) =>{
     const db_id = req?.params?.dbId;
     try {
          const db = await getDbById(db_id);
          if (db) {
          const authKeys = db.auth_keys;
          return res.status(200).json(prepareSuccessResponse({ message: `get authkeys successfully`,data:authKeys}))
          } else{
               return res.status(404).json(prepareErrorResponse({ message: `db is not exists` }));
          }
     } catch (error) {
          console.log(error)
          return res.status(400).json(prepareErrorResponse({ message: `server error ${error.message}` }));
     }
     
}

const deleteAuthKey = async (req, res) => {
     const db_id = req?.params?.dbId;
     const authKey = req?.params?.authkey;
     const adminId = req?.params?.adminId
     try {
          const db = await getDbById(db_id);
          if (db) {
               console.log("`auth_keys.${authKey}.admin` : ", db.auth_keys[`${authKey}`].createBy);
               console.log("AdminId : ", adminId);
               if (db.auth_keys[`${authKey}`].createBy == adminId) {
                    const data1 = await deleteAuthKeyInDb(db_id, authKey)
                    return res.status(200).json(prepareSuccessResponse({ message: `delete authkey successfully` }))


               }
               else {
                    return res.status(404).json(prepareErrorResponse({ message: `unauthorized user only admin can delete Auth key` }));
               }

          } else {
               return res.status(404).json(prepareErrorResponse({ message: `db is not exists` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error deleting authkey ${err.message}` }));
     }

}

const updateAuthKey = async (req, res) => {
     const db_id = req?.params?.dbId;
     const authKey = req?.params?.authkey;
     const access = req?.body?.access
     try {
          const data = await getDbById(db_id);
          if (access != 1) {
               const tableName = data?.tables[access];
               if (!tableName)
                    return res.status(404).json(prepareErrorResponse({ message: `Table doesnot exits in db` }));
          }
          const data1 = await updateAuthKeyInDb(db_id, authKey, access)
          try {
               return res.status(200).json(prepareSuccessResponse({ message: `insert authkey successfully` }))
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
     }

}


module.exports = { createAuthKey, deleteAuthKey, updateAuthKey ,getAuthKeys}