const express = require('express')
const router = express('Router')
const {createForm,addField,removeField,deleteForm} = require("../controllers/formController");
const {checkAuthKey} = require("../middleWares/authKey")

router.route('/:dbId/table/:tablename/form').post(checkAuthKey,createForm)
router.route('/:dbId/table/:tablename/form/addfield').patch(checkAuthKey,addField)
router.route('/:dbId/table/:tablename/form/removefield').patch(checkAuthKey,removeField)
router.route('/:dbId/table/:tablename/form/deleteform').delete(checkAuthKey,dcheckAuthKey,eleteForm)


module.exports=router;