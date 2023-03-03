const express = require('express');
const router = express.Router();
const {createFilter,updateFilterName,deleteFilter,updateQuery} = require("../controllers/filterController")
const {checkAuthKey} = require("../middleWares/authKey")
const {decodeToken} = require("../middleWares/auth")

router.route('/:dbId/:tableName/filter').post(decodeToken,checkAuthKey,createFilter);
router.route('/:dbId/:tableName/updateFilter').patch(decodeToken,checkAuthKey,updateFilterName)
router.route('/:dbId/:tableName/deleteFilter').patch(decodeToken,checkAuthKey,deleteFilter)
router.route('/:dbId/:tableName/updateQuery').patch(decodeToken,checkAuthKey,updateQuery)
module.exports = router;
