const dbService = require("../db_services/formDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const Form = require('../models/formModel')

const formService = require("../Db_Services/formDbService");


const createForm= async (req,res)=>{
        try 
        {  
            const db_id = req?.params?.dbId  
            const table_name = req?.params?.tablename;
            const name = req?.body?.userName;
            const fields = req?.body?.fieldName;
            const form = new Form(req?.body);
            form.db_id=db_id;
            form.table_name=table_name;
            form.fields=fields;
            form.name=name;
            try{
                const formData = await formService.saveForm(form);
                const data= await formService.createFormInDb(db_id,table_name,formData._id,fields,name);
                if(!(data.modifiedCount >=1 ))
                {
                    
                    const deletedid = await formService.deleteDbById(formData._id)
                    return res.status(404).json(prepareErrorResponse({ message: "Incorrect Db Id" }));
                        
                }
                console.log(data.modifiedCount);
                return res.status(200).json(prepareSuccessResponse({ data: form, message: "successfully create form" }));
            }
            catch (error) 
            {
                console.log(error)
                return res.status(404).json(prepareErrorResponse({ message: "Cannot submit form", data: { error } }));
        
            }
        }
         catch (error) 
         {
            console.log(error)
           return res.status(404).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
     
        }
     }
     const deleteForm = async (req,res)=>{
        try {
             
            const db_id = req?.params?.dbId
            console.log("db_id",db_id)

            const db = await formService.deleteFormByDbId(db_id)
            
            if(!db_id){
                return res.status(404).json(prepareErrorResponse({ message: "form not found with db_id", data: { error } }));
    
            }
            
            return res.status(201).json(prepareSuccessResponse({ data: db, message: "Successfully delete form" }));
    
         } catch (error) {
            console.log(error)
            return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));    
         }
    }
           
   
   


       

module.exports={createForm,deleteForm}
