const dbService = require("../db_services/formDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const Form = require('../models/formModel')
const {getById} = require('../db_services/masterDbService')
const formService = require("../Db_Services/formDbService");


const createForm= async (req,res)=>{
        try 
        {  
 
            const db_id = req?.params?.dbId ;
            const table_name = req?.params?.tablename;
            
            const form = new Form(req?.body);
            form.db_id=db_id;
            form.table_name=table_name;
           
            try{
                  const dataOfDb = await getById(db_id);
                 
                  if(!dataOfDb?.tables[table_name])
                      return res.status(404).json(prepareErrorResponse({ message: "Incorrect Db id or Table Name" }));  
                  const fields = dataOfDb?.tables[table_name]?.fields;
                  if(fields)
                  {var keys = Object.keys(fields);


                  form.fields = keys;}
                  const formData = await formService.saveForm(form);
                  const data= await formService.createFormInDb(db_id,table_name,formData._id);
                  return res.status(200).json(prepareSuccessResponse({ data: form, message: "successfully create form" }));
            }
            catch (error) 
            {
                console.log(error)
                return res.status(404).json(prepareErrorResponse({ message: "Cannot create  form", data: { error } }));
        
            }
        }
         catch (error) 
         {
            console.log(error)
           return res.status(404).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
     
        }
}
const addField = async (req, res) => {
        const form_id = req?.body?.form_id
        const db_id = req?.params?.db_id;
        const table_name = req?.params?.table_name;
        const field_name = req?.body?.field_name;
        try{    
        const data= await formService.addFieldInForm(field_name,form_id);
          const dataOfDb = await getById(db_id);     
         return res.status(200).json(prepareSuccessResponse({  message: "successfully addField in form" }));
        }
        
        catch(error){
            console.log(error)
        return res.status(403).json(prepareErrorResponse({ message: "some error on serverrrr"}));
        }
}
const removeField = async (req, res) => {
    const form_id = req?.body?.form_id
    const db_id = req?.params?.db_id;
    //const table_name = req?.params?.table_name;
    const field_name = req?.body?.field_name;
try{
    const data= await formService.removeFieldInForm(field_name,form_id);
    
     return res.status(200).json(prepareSuccessResponse({  message: "successfully removeField in form" }));
    }
    
    catch(error){
        console.log(error)
    return res.status(403).json(prepareErrorResponse({ message: "some error on serverrrr"}));
    }
}

const deleteForm = async (req, res) => {
    const form_id = req?.body?.form_id
    const db_id = req?.params?.dbId;
    const table_name = req?.params?.tablename;
    
    try{
        const data= await formService.deleteFormByFormId(form_id);
        const  data1 = await formService.deleteFormInDb(db_id,table_name,form_id) 
       return res.status(200).json(prepareSuccessResponse({  message: "Delete form  successfully"}));
    }
    catch (error){
    
            console.log(error)
        return res.status(403).json(prepareErrorResponse({ message: "some error on serverrrr"}));
    }

}


module.exports={createForm,addField,removeField,deleteForm}
