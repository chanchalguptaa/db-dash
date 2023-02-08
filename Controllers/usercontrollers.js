const users = require('../Models/userModel')

const getAllUsers = async (req, res) => {
   //  console.log('111')
   //  const user = await users.find({});
   //  console.log('222')
   //  res.send(user);

   try {
      const user = await users.find({});
      res.send(user);
   } catch (error) {
      res.status(401).send(error)
   }
 }

 const createUser =  async (req, res) => {
    console.log("start");
    try {
      const user = new users(req.body);
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send(error)
    }
     }

  module.exports = {getAllUsers,createUser}