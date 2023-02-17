const users = require('../models/userModel')
const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const userService = require("../Db_Services/userDbService")

const getAllUsers = async (req, res) => {
   try {
      const user = await userService.getAllUser()
      return res.status(201).json(prepareSuccessResponse({ data: user, message: "Successfully get user" }));
   } catch (error) {
      console.log(error)
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
   }
}

const createUser = async (req, res) => {
   try {
      const user = new users(req?.body);
      await userService.saveUser(user)
      return res.status(201).json(prepareSuccessResponse({ data: user, message: "User created" }));

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

   }
}

const getUserById = async (req, res) => {
   try {
      const id = req?.params?.id;
      const user = await userService.getUserById(id);
      if (!user) {
         return res.status(400).json(prepareErrorResponse({ message: "user not found", data: { error } }));
      }
      res.send(user)
      return res.status(201).json(prepareSuccessResponse({ data: user, message: "User found" }));

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
   }
}

const updateUser = async (req, res) => {
   try {
      const id = req?.params?.id;
      const first_name = req?.body.first_name;
      const last_name = req?.body.last_name;
      const db = req?.body.dbs;

      const user = await userService.updateUser(first_name, last_name, id, db)
      return res.status(201).json(prepareSuccessResponse({ data: user, message: "User updated successfully" }));
   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Failed to update user", data: { error } }));
   }
}

const deleteUser = async (req, res) => {
   try {
      const id = req?.params?.id
      const user = await userService.deleteUserById(id)
      if (!user) {
         return res.status(404).json(prepareErrorResponse({ message: "user not found with id", data: { error } }));
      }
      return res.status(201).json(prepareSuccessResponse({ data: user, message: "User deleted successfully" }));

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));

   }
}

const findUserByEmail = async (req, res) => {
   try {
      const email = req.params.email
      const user = await userService.getUserByEmail(email)
      if (!user) {
         return res.status(404).json(prepareErrorResponse({ message: "user not found", data: { error } }));
      }
      
      return res.status(201).json(prepareSuccessResponse({ data: user, message: "User find successfully" }));

   } catch (error) {
      return res.status(400).json(prepareErrorResponse({ message: "Some error on server", data: { error } }));
   }
}

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser, findUserByEmail }