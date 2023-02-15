const express = require('express');
const router = express.Router();
const {createFilter,updateFilter} = require("../controllers/filterController")


router.route('/:dbId/:tableName/filter').post(createFilter);
router.route('/:dbId/:tableName/updateFilter').patch(updateFilter)

module.exports = router;
