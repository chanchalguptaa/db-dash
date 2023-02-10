const users = require('../models/userModel')

const userService = require("../Db_Services/userDbService")

const getAllUsers = async (req, res) => {
   try {
      const user = await userService.getAllUser()
      res.send(user);
   } catch (error) {
      res.status(401).send(error)
   }
 }

 const createUser =  async (req, res) => {
    try {
      const user = new users(req?.body);
      await userService.saveUser(user)
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
   }

   const getUserById = async (req,res)=>{
      try {
         const id = req?.params?.id;
         const user = await userService.getUserById(id);
         console.log(user);
         if(!user){
            return res.status(404).send({error:"user not found with id "+id})
         }
         res.send(user)
      } catch (error) {
         res.status(400).send(error)
      }
   }

   const updateUserById = async (req,res)=>{
      try {
         const id = req?.params?.id;
         const first_name = req?.body.first_name;
         const last_name = req?.body.last_name;
         console.log(id,first_name,last_name)
         const dbs= req?.body.dbs;

         const user =  await userService.updateUser(first_name,last_name,id,dbs)  
         console.log(user) 
         res.send({ message: 'User updated successfully' ,user});
       } catch (error) {
         console.log(error);
         res.status(500).send({ error: 'Failed to update user' });
       }
   }

   const deleteUser = async(req,res)=>{
      try {
         
         const id = req?.params?.id
         const user = await userService.deleteUserById(id)
         if(!user){
           return res.status(404).send({error:"user not found with id "+id})
         }
         res.send({message:"delete done !",user})
      } catch (error) {
         res.status(400).send(error)
      }
   }

   const findUserByEmail = async(req,res)=>{
      try {
         const email = req.params.email
         console.log(email);
         const user = await userService.getUserByEmail(email)
         if(!user){
            return res.status(404).send({message:"user is not found"})
         } 
         res.send(user)
      } catch (error) {
         res.status(400).send(error)
      }
   }

  module.exports = {getAllUsers,createUser,getUserById,updateUserById,deleteUser,findUserByEmail}