const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const { getById } = require("../db_services/masterDbService");
const rowService = require("../sql_db_services/rowService.js")

const insertRow = async (req, res) => {
    const db_id = req?.params?.dbId;
    const tableName = req?.params?.tableName;
    const column1 = req?.body?.column1;
    const column2 = req?.body?.column2;
    const column3 = req?.body?.column3;
    const column4 = req?.body?.column4;
    const value1 = req?.body?.value1;
    const value2 = req?.body?.value2;
    const value3 = req?.body?.value3;
    const value4 = req?.body?.value4;
    
    console.log(tableName,column1,column2,column3,column4,value1,value2,value3,value4)
    try {
         const data = await getById(db_id);
         console.log(data);
        //  const dataType=data?.tables?.[tableName]?.fields?.[fieldName]||null;
        //  console.log("data in create table ", dataType);
         const ans = await rowService.inserRowService(tableName,column1,column2,column3,column4,value1,value2,value3,value4,data)
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