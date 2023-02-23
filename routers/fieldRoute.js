const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField } = require("../controllers/fieldController")
const {checkAuthKey} = require("../middleWares/authKey")

router.route('/:dbId/:tableName/field').post(checkAuthKey,createField)
router.route('/:dbId/:tableName/:fieldName/updatefield').patch(checkAuthKey,updateField)
router.route('/:dbId/:tableName/:fieldName/deletefield').delete(checkAuthKey,deleteField)
module.exports = router;