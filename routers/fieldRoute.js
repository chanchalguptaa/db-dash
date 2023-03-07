const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField,getAllField } = require("../controllers/fieldController")
const {commonAuth} = require("../middleWares/commanAuth")


router.route('/:dbId/:tableName/field').post(createField)
router.route('/:dbId/:tableName/field').get(getAllField);
router.route('/:dbId/:tableName/:fieldName/updatefield').patch(commonAuth,updateField)
router.route('/:dbId/:tableName/:fieldName/deletefield').delete(commonAuth,deleteField)
module.exports = router;