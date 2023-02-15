const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getById } = require("../db_services/masterDbService");

const createField = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.body?.tableName;
    const fieldName = req?.body?.fieldName;
    const fieldType = req?.body?.fieldType;
    try {
         const data = await getById(db_id);
         console.log("data in create table ", data);
         const ans = await fieldService.createFieldService(tableName, fieldName,fieldType,data)
         try {
            //   const data1 = await addTable(db_id, tableName)
              return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully` }))
         }
         catch (err) {
              return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
         }
    }
    catch (err) {
         return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
    }

}