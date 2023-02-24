const express = require('express');
const router = express.Router();
const {createFilter,updateFilterName,deleteFilter,updateQuery} = require("../controllers/filterController")
const {checkAuthKey} = require("../middleWares/authKey")

router.route('/:dbId/:tableName/filter').post(checkAuthKey,createFilter);
router.route('/:dbId/:tableName/updateFilter').patch(checkAuthKey,updateFilterName)
router.route('/:dbId/:tableName/deleteFilter').patch(checkAuthKey,deleteFilter)
router.route('/:dbId/:tableName/updateQuery').patch(checkAuthKey,updateQuery)
module.exports = router;
