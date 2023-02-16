const dbService = require("../db_services/formDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const Form = require('../models/formModel')
const {getById} = require('../db_services/masterDbService')
const formService = require("../Db_Services/formDbService");


const createForm= async (req,res)=>{
        try 
        {  
            // const name 
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
                  var keys = Object.keys(fields);
                  form.fields = keys;
                  const formData = await formService.saveForm(form);
                  const data= await formService.createFormInDb(db_id,table_name,formData._id);
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
    
           
   
   


       

module.exports={createForm}
