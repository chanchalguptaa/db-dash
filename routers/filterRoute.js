const express = require('express');
const router = express.Router();
const {createFilter} = require("../controllers/filterController")


router.route('/:dbId/:tableName/filter').post(createFilter);


module.exports = router;
