    const express = require('express');
const router = express.Router();
const {getAllUsers,createUser,getUserById,updateUser,deleteUser,findUserByEmail,loginUser,getUserProfile} = require('../Controllers/userController')
const {decodeToken} = require("../middleWares/auth")


router.route('/').post(createUser);
router.route('/:id').patch(decodeToken,updateUser);
router.route('/:id').delete(decodeToken,deleteUser);
router.route('/login').post(loginUser);


router.route('/profile/me').get(decodeToken,getUserProfile)
router.route('/:id').get(decodeToken,getUserById);
router.route('/email/:email').get(findUserByEmail)
router.route('/').get(getAllUsers);

module.exports = router; 
