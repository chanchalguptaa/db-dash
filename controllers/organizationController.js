const Org = require('../models/organizationModel')
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const orgService = require("../Db_Services/organizationDbService");
const userService = require("../db_services/userDbService")
const { isEmpty } = require('lodash');

const getAllOrgs = async (req, res) => {
   try {
      const org = await orgService.getAllOrgs()
      return res.status(201).json(prepareSuccessResponse({ data: org, message: "Successfully get org" }));
   } catch (error) {
      return res.status(401).json(prepareErrorResponse({ message: "Unauthorized user", data: { error } }));

   }
}
const addUserInOrg = async (req, res) => {
   try{
      const org_id = req?.params?.id;
      const user_id = req?.body?.user_id;
      const user_type = "user";
    try{
        const response = await orgService.addUserInOrg(org_id,{user_id,user_type});
      
        return res.status(200).json(prepareErrorResponse({message:"successfully user added" }));
    }catch(err){
      return res.status(403).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
   }
   }catch(error){
      return res.status(403).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
   }
   

}

const createOrg = async (req, res) => {
   console.log("in create org ");
   try {
      const org = req?.body?.name;
      const user_id = req?.body?.user_id;
      //check id sahi hai 
      if (!(req?.body?.name) ||req?.body?.name?.length<2)
      {
         return res.status(404).json(prepareErrorResponse({ message: "invalid orgname " }));
      }

      await orgService.saveOrg(org,user_id)
      return res.status(200).json(prepareSuccessResponse({ data: org, message: "successfully create org" }));

   }
   
    catch (error) {
      return res.status(404).json(prepareErrorResponse({ message: "some error on server", data: { error } }));

   }
}

const getOrgById = async (req, res) => {
   try {
      const id = req?.params?.id;
      const org = await orgService.getOrgById(id)
      if (!org) {
      return res.status(404).json(prepareErrorResponse({ message: "org not found with id", data: { error } }));       
      }
      return res.status(200).json(prepareSuccessResponse({ data: org, message: "successfully get org" }));

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "some error on server", data: { error } }));

   }
}

const updateOrg = async (req, res) => {
   try {
      const id = req?.params?.id;
      const orgData = req?.body;
      const data = await orgService.updateOrgTitle(id, orgData);
      if (data)
         return res.status(200).json(prepareSuccessResponse({ data: data, message: "Org updated successfully" }));
      else
         return res.status(404).json(prepareErrorResponse({ message: "id does not exixts", data: { error } }));

   } catch (error) {
      res.status(500).send({ error: 'Failed to update org' });
   }
}

const removeUserInOrg = async (req,res) =>{
   try{
      const org_id = req?.params?.id;
   const user_id = req?.body?.user_id;
     if(!user_id)
     return res.status(404).json(prepareErrorResponse({ message: "User not found", data: { error } }));
    try{
        const reponse = await orgService.removeUserInOrg(org_id,user_id);
        return res.status(200).json(prepareSuccessResponse({message:"successfully user removed" }));
    }catch(err){
        return res.status(403).json(prepareSuccessResponse({error:"some error on server"}));
    }
   }catch(error){
      return res.status(404).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
   }
   
 }

const deleteOrg = async (req, res) => {
   try {

      const id = req?.params?.id
      const org = await orgService.deleteOrgById(id)
      if (!org) {
         return res.status(404).json(prepareErrorResponse({ message: "id does not exixts", data: { error } }));
      }
      return res.status(200).json(prepareSuccessResponse({ data: org, message: "Org deleted successfully" }));

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

   }
}

module.exports = { getAllOrgs, createOrg, getOrgById, updateOrg, deleteOrg, addUserInOrg,removeUserInOrg }
