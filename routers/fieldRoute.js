const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField } = require("../controllers/fieldController")

router.route('/:dbId/:tableName/field').post(createField)
router.route('/:dbId/:tableName/:fieldName/updatefield').patch(updateField)
router.route('/:dbId/:tableName/:fieldName/deletefield').delete(deleteField)
module.exports = router;