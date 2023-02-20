const express = require('express');
const router = express.Router();
const {getAllUsers,createUser,getUserById,updateUser,deleteUser,findUserByEmail} = require('../Controllers/userController')


router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserById);
router.route('/:id').patch(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/email/:email').get(findUserByEmail)

module.exports = router; 
