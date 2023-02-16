const express = require('express');
const router = express.Router();
const {createFilter,updateFilterName,deleteFilter,updateQuery} = require("../controllers/filterController")


router.route('/:dbId/:tableName/filter').post(createFilter);
router.route('/:dbId/:tableName/updateFilter').patch(updateFilterName)
router.route('/:dbId/:tableName/deleteFilter').patch(deleteFilter)
router.route('/:dbId/:tableName/updateQuery').patch(updateQuery)
module.exports = router;
