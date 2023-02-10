const express = require('express');
const router = express.Router();
const { createDb,deleteDb } = require('../controllers/dbController')


router.route('/').post(createDb);
router.route('/').delete(deleteDb);

module.exports = router;