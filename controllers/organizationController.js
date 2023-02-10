// const Org = require('../Models/organizationModel')

const orgService = require("../Db_Services/organizationDbService");

const getAllOrgs = async (req, res) => {
   try {
      const org = await orgService.getAllOrgs()
      res.send(org);
   } catch (error) {
      res.status(401).send(error,"Unauthorized user");
   }
 }
 const addUserInOrg = async (req,res) =>{
   
   const org_id = req?.params?.id;
   const user_id = req?.body?.user_id;
     if(!user_id)
         return res.status(404).json({error:"userId not found"});
    const user_type = "user";
    try{
       const data  =  await orgService.addUserInOrg(org_id,{user_id,user_type});
        return res.status(200).json({message:"successfully user added" ,data});
    }catch(err){
        return res.status(403).json({error:"some error on server"});
    }

 }

 const createOrg =  async (req, res) => {
    try {
      const org = new Org(req?.body);
      await orgService.saveOrg(org)
      res.send(org);
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
   }

   const getOrgById = async (req,res)=>{
      try {
         const id = req?.params?.id;
         const org = await orgService.getOrgById(id)
         if(!org){
            return res.status(404).send({error:"org not found with id "+id})
         }
         res.send(org)
      } catch (error) {
         res.status(400).send(error)
      }
   }

   const updateOrg = async (req,res)=>{
      try {
         const id = req?.params?.id;
         const orgData = req?.body;
         const data = await orgService.updateOrgTitle(id,orgData);
         if(data)
            return res.status(200).send({ message: 'Org updated successfully' ,data});
         else
            return res.status(404).send({ message: 'id doesnot exixts' ,});
       } catch (error) {
         console.log(error);
         res.status(500).send({ error: 'Failed to update org' });
       }
   }

   const deleteOrg = async(req,res)=>{
      try {
         
         const id = req?.params?.id
         const org = await orgService.deleteOrgById(id)
         if(!org){
           return res.status(404).send({error:"org not found with id "+id})
         }
         res.send({message:"delete done !",org})
      } catch (error) {
         res.status(400).send(error)
      }
   }

  module.exports = {getAllOrgs,createOrg,getOrgById,updateOrg,deleteOrg,addUserInOrg}