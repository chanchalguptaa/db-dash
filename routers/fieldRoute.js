const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField } = require("../controllers/fieldController")
const {checkAuthKey} = require("../middleWares/authKey")


router.route('/:dbId/:tableName/field').post(checkAuthKey,createField)
router.route('/:dbId/:tableName/updatefield').patch(checkAuthKey,updateField)
router.route('/:dbId/:tableName/deletefield').delete(checkAuthKey,deleteField)
module.exports = router;