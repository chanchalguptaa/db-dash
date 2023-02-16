const express = require('express')
const router = express('Router')
const {createform } = require("../controllers/formController")

router.route('/:dbId/table/:tablename/form').post(createform)

module.exports=router;