/*
author : vipin sharma 
Email : vipin@walkover.in
cratedAt : 
purpose : This controller is used to insert raw data in database.
*/

const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getDbById } = require("../db_services/masterDbService");
const rowService = require("../sql_db_services/rowService.js")

const insertRow = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    const columAndData = req?.body;
    
    try {
         const data = await getDbById(db_id);
         const ans = await rowService.inserRowService(tableName,columAndData,data)
         try {
              return res.status(200).json(prepareSuccessResponse({ message: `'${tableName}'row created successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error creating row ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error creating row ${err.message}` }));
    }

}


const getRow = async (req, res) => {
     const db_id = req?.params?.dbId
     const tableName = req?.params?.tableName;
     const query = req.query;

     try {
          const data = await getDbById(db_id);
          
          const ans = await rowService.getRowService(tableName,query,data)
          try {
               return res.status(200).json(prepareSuccessResponse({ data : ans, message: `'${tableName}'sort row successfully` }))
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error sorting row ${err.message}` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error sorting row ${err.message}` }));
     }

}


const deleteRow = async (req, res) => {
     const db_id = req?.params?.dbId;
     const tableName = req?.params?.tableName;
     const row_id = req?.body?.row_id;

     try {
          const data = await getDbById(db_id);
          
          const ans = await rowService.deleteRowService(tableName,row_id,data)
          try {
               return res.status(200).json(prepareSuccessResponse({ message: `'${tableName}'row delete successfully` }))
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error deleting row ${err.message}` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error deleting row ${err.message}` }));
     }
 
 }



const updateRow = async (req, res) => {
     const db_id = req?.params?.dbId;
     const tableName = req?.params?.tableName;
     const row_id = req?.params?.row_id;
     const columAndData = req?.body;

     try {
          const data = await getDbById(db_id);
          
          const ans = await rowService.updateRowService(tableName,row_id,columAndData,data)
          try {
               return res.status(200).json(prepareSuccessResponse({ message: `'${tableName}'row updated successfully` }))
          }
          catch (err) {
               return res.status(400).json(prepareErrorResponse({ message: `Error updating row ${err.message}` }));
          }
     }
     catch (err) {
          return res.status(400).json(prepareErrorResponse({ message: `Error updating row ${err.message}` }));
     }
 
 }


module.exports = {insertRow,getRow,deleteRow,updateRow}