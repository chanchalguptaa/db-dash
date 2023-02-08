const express = require('express');
const router = express.Router();
const {getAllUsers,createUser} = require('..//Controllers/usercontrollers')


router.route('/').get(getAllUsers);
router.route('/').post(createUser);


module.exports = router; 