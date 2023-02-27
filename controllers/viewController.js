const viewService = require("../db_services/viewDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");

const { v4: uuidv4 } = require('uuid');

const createView = async (req , res )=>{

    try {
        const id = req?.params?.dbId
        const fieldData = req?.body
        const field_name = req?.body?.field_name
        const tableName = req?.params?.tableName
        if(tableName==fieldData.table_name) {
            return res.status(400).json(prepareErrorResponse({message:"view can not be created  in with same table name"}))
        }
        const data = await viewService.getField(id,fieldData)
        const fields = data[0]?.tables[fieldData?.table_name].fields;
        if(!(fields[field_name]))  
           return res.status(404).json(prepareErrorResponse({ message: "field doesnot exits in table"}));
        const view = data[0].tables[`${fieldData.table_name}`].fields[`${fieldData.field_name}`]
        
        const reData = await viewService.saveView(id,tableName,view,fieldData)
        if(reData.modifiedCount==0)
        {
           return res.status(404).json(prepareErrorResponse({ message: "field already exits in table"}));
        }
        return res.status(201).json(prepareSuccessResponse({ data: reData, message: "View created" }));
    } catch (error) {
       return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
 
    }
}

const deleteView = async (req , res )=>{
    try {
        const id = req?.params?.dbId
        const viewName = req?.body?.view_name
        const tableName = req?.params?.tableName
        const reData = await viewService.deleteView(id,tableName,viewName)
        if(reData.modifiedCount==0)
        {
            res.status(400).json(prepareErrorResponse({ message: "all ready deleted"}));
        }
        return res.status(201).json(prepareSuccessResponse({ data: reData, message: "View Deleted" }));
    } catch (error) {
        console.log(error);
       return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
 
    }
}

const deleteFieldInView = async (req , res )=>{
    try {
        const id = req?.params?.dbId
        const viewData = req?.body
        const tableName = req?.params?.tableName
        const reData = await viewService.deleteFieldInView(id,tableName,viewData)
        return res.status(201).json(prepareSuccessResponse({ data: reData, message: "View Updated" }));
    } catch (error) {
       return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
 
    }
}


module.exports = {createView,deleteView,deleteFieldInView}