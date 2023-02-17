const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField } = require("../controllers/fieldController")

router.route('/:dbId/:tableName/field').post(createField)
router.route('/:dbId/:tableName/updatefield').patch(updateField)
//router.route('/:dbId/:tableName/deletefield').delete(deleteField)
module.exports = router;