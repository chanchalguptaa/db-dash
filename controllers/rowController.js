const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getById } = require("../db_services/masterDbService");
const rowService = require("../sql_db_services/rowService.js")

const insertRow = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    const columAndData = req?.body;
//     const value4 = req?.body?.value4;
    
    console.log(tableName,columAndData)
    try {
         const data = await getById(db_id);
         console.log(data);
         
        //  const dataType=data?.tables?.[tableName]?.fields?.[fieldName]||null;
        //  console.log("data in create table ", dataType);
         const ans = await rowService.inserRowService(tableName,columAndData,data)
         console.log('third')
         try {
            //   const data1 = await addTable(db_id, tableName)
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

module.exports = {insertRow}