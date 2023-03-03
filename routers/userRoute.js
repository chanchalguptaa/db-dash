    const express = require('express');
const router = express.Router();
const {getAllUsers,createUser,getUserById,updateUser,deleteUser,findUserByEmail,loginUser} = require('../Controllers/userController')
const {decodeToken} = require("../middleWares/auth")


router.route('/').get(getAllUsers);
router.route('/login').post(loginUser);
router.route('/').post(createUser);
router.route('/:id').get(getUserById);
router.route('/:id').patch(decodeToken,updateUser);
router.route('/:id').delete(decodeToken,deleteUser);
router.route('/email/:email').get(findUserByEmail)

module.exports = router; 
