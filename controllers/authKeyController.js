const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getById } = require("../db_services/masterDbService");
const { insertAuthKey, deleteAuthKeyInDb, updateAuthKeyInDb } = require("../db_services/authKeyDbService")

const createAuthKey = async (req, res) => {
    const db_id = req?.params?.dbId;
    var access = req?.body?.access
  
    try {
         const data = await getById(db_id);
         if(access!=1)
         {
               if( !(Array.isArray(access)))
               return  res.status(404).json(prepareErrorResponse({ message: `Table name should be in array format` }));
              var allTablesAccess = {};
              var error= "false"
              access?.map(element => {
                    const tableName = data?.tables[element];
                    if(!tableName)
                    {
                         error= "true";
                         return ;
                    }
                    Object.assign(allTablesAccess, {[element]:{}});
              });
              if(error === "true")
               return res.status(404).json(prepareErrorResponse({ message: `Table doesnot exits in db` }));
                access = allTablesAccess;
         }

         try {
               const data1 = await insertAuthKey(db_id,access)
              return res.status(200).json(prepareSuccessResponse({ message: `insert authkey successfully` }))
         }
         catch (err) {

              return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
         }
    }
    catch (err) {
     console.log(err)
         return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
    }

}

const deleteAuthKey = async (req, res) => {
    const db_id = req?.params?.dbId;
    const authKey =  req?.params?.authkey;
    try {
         const data = await getById(db_id);
         const data1 = await deleteAuthKeyInDb(db_id,authKey)
         try {
              return res.status(200).json(prepareSuccessResponse({ message: `delete authkey successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error deleting authkey ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error deleting authkey ${err.message}` }));
    }

}

const updateAuthKey = async (req, res) => {
     const db_id = req?.params?.dbId;
     const authKey =  req?.params?.authkey;
     const access = req?.body?.access
     try {
          const data = await getById(db_id);
          if(access!=1)
          {
               const tableName = data?.tables[access];
                if(!tableName)
                     return res.status(404).json(prepareErrorResponse({ message: `Table doesnot exits in db` }));
          }
          const data1 = await updateAuthKeyInDb(db_id,authKey,access)
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


    module.exports = {createAuthKey,deleteAuthKey,updateAuthKey}