const express = require('express')
const router = express('Router')
const {createForm,addField,removeField,deleteForm} = require("../controllers/formController");
const {commonAuth} = require("../middleWares/commanAuth")



router.route('/:dbId/table/:tablename/form').post(commonAuth,createForm)
router.route('/:dbId/table/:tablename/form/addfield').patch(commonAuth,addField)
router.route('/:dbId/table/:tablename/form/removefield').patch(commonAuth,removeField)
router.route('/:dbId/table/:tablename/form/deleteform').delete(commonAuth,deleteForm)


module.exports=router;