const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getDbById } = require("../db_services/masterDbService");
const { insertAuthKey, deleteAuthKeyInDb, updateAuthKeyInDb } = require("../db_services/authKeyDbService")

const createAuthKey = async (req, res) => {
    const db_id = req?.params?.dbId;
    const adminId = req?.params?.adminId
    var access = req?.body?.access
    var authObj={}
    try {
         const data = await getDbById(db_id);
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
         authObj.access=access;
         authObj.user=req?.body?.userId
         authObj.scope = req?.body?.scope
         authObj.createBy = adminId
         authObj.createDate = new Date()

         console.log("Auth Obj : ",authObj);

         try {
               const data1 = await insertAuthKey(db_id,authObj)
              
               console.log("DATA : ",data1);

              return res.status(200).json(prepareSuccessResponse({ message: `insert authkey successfully` }))
         }
         catch (err) {

              console.log("Error 1 : ",err);
              return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
         }
    }
    catch (err) {
          console.log("Error 2 : ",err);
         return res.status(400).json(prepareErrorResponse({ message: `Error creating authkey ${err.message}` }));
    }

}

const deleteAuthKey = async (req, res) => {
    const db_id = req?.params?.dbId;
    const authKey =  req?.params?.authkey;
    try {
         const data = await getDbById(db_id);
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
          const data = await getDbById(db_id);
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