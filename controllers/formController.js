const dbService = require("../db_services/formDbService")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const Form = require('../models/formModel')

const formService = require("../Db_Services/formDbService");


const createform= async (req,res)=>{
    const db_id = req?.params?.dbId  
    const table_name = req?.params?.tablename;

        try 
        {  

            const form = new Form(req?.body);
            form.db_id=db_id;
            form.table_name=table_name;
            const formData = await formService.saveForm(form);
            const data= await formService.createFormInDb(db_id,table_name,formData._id);
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
           return res.status(404).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
     
        }
     }
           
   
   


       

module.exports={createform}
