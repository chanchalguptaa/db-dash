const express = require('express')
const router = express('Router')
const {createForm,addField,removeField} = require("../controllers/formController");


router.route('/:dbId/table/:tablename/form').post(createForm)
router.route('/:dbId/table/:tablename/form/addfield').patch(addField)
router.route('/:dbId/table/:tablename/form/removefield').patch(removeField)

module.exports=router;