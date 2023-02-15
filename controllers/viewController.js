const viewService = require("../db_services/masterDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");

const { v4: uuidv4 } = require('uuid');

const createView = async (req , res )=>{

    try {
        const id = req?.params?.dbId
        const fieldData = req?.body
        const tableName = req?.params?.tableName
        console.log("Gi "+tableName);
        const data = await viewService.getField(id,fieldData)
        console.log(data);
        
        const view = data[0].tables
        console.log(view);
        // "tables.table1.data"

        const reData = await viewService.saveView(id,tableName,view)
        return res.status(201).json(prepareSuccessResponse({ data: reData, message: "View created" }));

    } catch (error) {
        console.log(error);
       return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
 
    }
}

module.exports = {createView}