const express = require('express')
const router = express('Router')
const {createForm,deleteForm,updateForm } = require("../controllers/formController")

router.route('/:dbId/table/:tablename/form').post(createForm)
//router.route('/:dbId/table/:tablename/form').patch(updateForm)
router.route('/:dbId/table/:tablename/form').delete(deleteForm)

module.exports=router;