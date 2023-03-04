const express = require('express')
const router = express('Router')
const {createForm,addField,removeField,deleteForm} = require("../controllers/formController");
const {checkAuthKey} = require("../middleWares/authKey")
const {decodeToken} = require("../middleWares/auth")


router.route('/:dbId/table/:tablename/form').post(decodeToken,checkAuthKey,createForm)
router.route('/:dbId/table/:tablename/form/addfield').patch(decodeToken,checkAuthKey,addField)
router.route('/:dbId/table/:tablename/form/removefield').patch(decodeToken,checkAuthKey,removeField)
router.route('/:dbId/table/:tablename/form/deleteform').delete(decodeToken,checkAuthKey,deleteForm)


module.exports=router;