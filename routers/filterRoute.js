const express = require('express');
const router = express.Router();
const {createFilter,updateFilterName,deleteFilter,updateQuery} = require("../controllers/filterController")
const {commonAuth} = require("../middleWares/commanAuth")


router.route('/:dbId/:tableName/filter').post(commonAuth,createFilter);
router.route('/:dbId/:tableName/updateFilter').patch(commonAuth,updateFilterName)
router.route('/:dbId/:tableName/deleteFilter').patch(commonAuth,deleteFilter)
router.route('/:dbId/:tableName/updateQuery').patch(commonAuth,updateQuery)
module.exports = router;
