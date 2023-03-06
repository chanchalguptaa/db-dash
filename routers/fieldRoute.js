const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField,getAllField } = require("../controllers/fieldController")
const {checkAuthKey} = require("../middleWares/authKey")
const {decodeToken} = require("../middleWares/auth")


router.route('/:dbId/:tableName/field').post(createField)
router.route('/:dbId/:tableName/field').get(getAllField);
router.route('/:dbId/:tableName/:fieldName/updatefield').patch(decodeToken,checkAuthKey,updateField)
router.route('/:dbId/:tableName/:fieldName/deletefield').delete(decodeToken,checkAuthKey,deleteField)
module.exports = router;