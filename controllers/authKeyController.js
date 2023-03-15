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
                    var allTablesAccess = [];
                    var error = "false"
                    access?.map(element => {
                         const tableName = data?.tables[element];
                         if (!tableName) {
                              error = "true";
                              return;
                         }
                         allTablesAccess.push(element)
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
                    return res.status(200).json(prepareSuccessResponse({ data:data1,message: `insert authkey successfully` }))
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
               return res.status(400).json(prepareErrorResponse({ message: `server error ${error.message}` }));
          }
          
     }

     const getSingleAuthKey = async (req,res) =>{
          const db_id = req?.params?.dbId;
          const authKey = req?.params?.authKey
          try {
               const db = await getDbById(db_id);
               if (db) {
               const resultAuthKey = db.auth_keys[`${authKey}`];
               return res.status(200).json(prepareSuccessResponse({ message: `get authkeys successfully`,data:resultAuthKey}))
               } else{
                    return res.status(404).json(prepareErrorResponse({ message: `db is not exists` }));
               }
          } catch (error) {
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
          var access = req?.body?.access;
          var authObj={};
          try {
               const data = await getDbById(db_id);
               if(access===undefined) access=data?.auth_keys?.[authKey]?.access;
               else{
               if (access != 1) {
                    if (!(Array.isArray(access)))
                         return res.status(404).json(prepareErrorResponse({ message: `Table name should be in array format` }));
                    var allTablesAccess = [];
                    var error = "false"
                    access?.map(element => {
                         const tableName = data?.tables[element];
                         if (!tableName) {
                              error = "true";
                              return;
                         }
                         allTablesAccess.push(element);
                    });
                    if (error === "true")
                         return res.status(404).json(prepareErrorResponse({ message: `Table doesnot exits in db` }));
                    access = allTablesAccess;
               }
               }
                    authObj.access = access;
                    if(req?.body?.userId)
                    authObj.user = req?.body?.userId
                    else
                    authObj.user=data?.auth_keys?.[authKey]?.user;
                    if(req?.body?.scope)
                    authObj.scope = req?.body?.scope
                    else
                    authObj.scope=data?.auth_keys?.[authKey]?.scope;
                    authObj.createDate = new Date();
               try {
                    const data1 = await updateAuthKeyInDb(db_id,authKey, authObj);
                    return res.status(200).json(prepareSuccessResponse({ message: `update authkey successfully` }))
               }
               catch (err) {
                    return res.status(400).json(prepareErrorResponse({ message: `Error updating authkey ${err.message}` }));
               }
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error updating authkey ${err.message}` }));
          }
     }
     module.exports = { createAuthKey, deleteAuthKey, updateAuthKey ,getAuthKeys,getSingleAuthKey}