const Org = require('../models/organizationModel')
const Db = require("../models/dbModel")
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const orgService = require("../Db_Services/organizationDbService");
const userService = require("../db_services/userDbService")
const { isEmpty } = require('lodash');
const sqlDbService = require("../sql_db_services/databaseService")
const dbService = require("../db_services/masterDbService")
const getAllOrgs = async (req, res) => {
   try {
      const org = await orgService.getAllOrgs()
      return res.status(201).json(prepareSuccessResponse({ data: org, message: "Successfully get org" }));
   } catch (error) {
      return res.status(401).json(prepareErrorResponse({ message: "Unauthorized user", data: { error } }));

   }
}
const addUserInOrg = async (req, res) => {
   const org_id = req?.params?.id;
   const user_id = req?.body?.user_id;
   const adminId = req?.params?.adminId
   const user_type = "user";
   try {
      const userRole = await orgService.userRole(id, adminId)
      if (userRole === 'admin') {
         const ifUser = await userService.getUserById(user_id);
         if (ifUser != null) {
            const response = await orgService.addUserInOrg(org_id, { user_id, user_type });
            return res.status(200).json(prepareSuccessResponse({ data: response, message: "successfully add user" }));
         }
         else {
            return res.status(403).json(prepareErrorResponse({ message: "some error on server" }));
         }
      } else {
         return res.status(401).json(prepareErrorResponse({ message: "unauthorized user only admin can add user in Org" }));
      }

   } catch (error) {
      return res.status(403).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
   }


}

const createOrg = async (req, res) => {
   try {
      const org = req?.body?.name;
      const user_id = req?.body?.user_id;

      console.log("Org: ",org, " User_id : ",user_id);

      if (!(req?.body?.name) || req?.body?.name?.length < 2) {
         return res.status(404).json(prepareErrorResponse({ message: "invalid orgname " }));
      }
      try {
         const ifUser = await userService.getUserById(user_id);
         if(ifUser != null)
         {
           const orgData =  await orgService.saveOrg(org,user_id);
           await addDefaultdbInOrg (orgData._id,"untitledDb",user_id);
            return res.status(200).json(prepareSuccessResponse({ data: orgData, message: "successfully created organization" }));
         }
         else {
            return res.status(403).json(prepareErrorResponse({ message: "user does not exist" }));
         }

      } catch (error) {
         return res.status(403).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
      }
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
      const adminId = req?.params?.adminId
      const userRole = await orgService.userRole(id, adminId)
      if (userRole === 'admin') {
         const data = await orgService.updateOrgTitle(id, orgData);
      if (data)
         return res.status(200).json(prepareSuccessResponse({ data: data, message: "Org updated successfully" }));
      else
         return res.status(404).json(prepareErrorResponse({ message: "id does not exixts", data: { error } }));
      }else{
         return res.status(401).json(prepareErrorResponse({ message: "unauthorized user only admin can Update Org" }));
      }

   } catch (error) {
      res.status(500).send({ error: 'Failed to update org' });
   }
}

const removeUserInOrg = async (req, res) => {
   try {
      const org_id = req?.params?.id;
      const user_id = req?.body?.user_id;
      const adminId = req?.params?.adminId
      const userRole = await orgService.userRole(id, adminId)
      if (userRole === 'admin') {
         if (!user_id)
            return res.status(404).json(prepareErrorResponse({ message: "User not found", data: { error } }));
         try {
            const reponse = await orgService.removeUserInOrg(org_id, user_id);
            return res.status(200).json(prepareSuccessResponse({ message: "successfully user removed" }));
         } catch (err) {
            return res.status(403).json(prepareSuccessResponse({ error: "some error on server" }));
         }
      } else {
         return res.status(401).json(prepareErrorResponse({ message: "unauthorized user only admin can remove user in Org" }));
      }
   } catch (error) {
      return res.status(404).json(prepareErrorResponse({ message: "some error on server", data: { error } }));
   }

}

const deleteOrg = async (req, res) => {
   try {

      const id = req?.params?.id
      const orgIdInDb = await dbService.getDbByOrgId(id);
      const dbId = [];
      const adminId = req?.params?.adminId
      const userRole = await orgService.userRole(id, adminId)
      if (userRole === 'admin') {
         for(const item of orgIdInDb)
      {
         dbId.push(item._id);
      }  
      const deleteDBs = await dbService.deleteDbByOrgId(id);
      const deleteDB = await userService.deleteDbInUser(dbId);
      const org = await orgService.deleteOrgById(id)
      if (!org) {
         return res.status(404).json(prepareErrorResponse({ message: "id does not exixts", data: { error } }));
      }
      return res.status(200).json(prepareSuccessResponse({ data: org, message: "Org deleted successfully" }));
      }else{
         return res.status(401).json(prepareErrorResponse({ message: "unauthorized user only admin Delete Org" }));
      }

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

   }
}

const addDefaultdbInOrg = async (orgId,dbName,userId)=>{
   try {
      const db = new Db()
      db.name=dbName;
      const org_id = orgId;
      const sqlDbName = db?.name + "_" + org_id
      const user_id = userId
      db.org_id = org_id
      const conUrl = await sqlDbService.createDatabase(sqlDbName)
      try {

         db.con_url = conUrl
         const data = await dbService.saveDb(db);
         const dbId = data?._id + ""
         const result = await userService.addDbIdInUSerSchema(user_id, dbId)
         return;

      } catch (error) {
          await sqlDbService.dropDatabase(sqlDbName)
          throw error ;

      }
  } catch (error) {
      throw error ;
  }
}

module.exports = { getAllOrgs, createOrg, getOrgById, updateOrg, deleteOrg, addUserInOrg, removeUserInOrg }
