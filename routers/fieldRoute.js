const express = require("express")
const router = express.Router()
const { createField,deleteField,updateField } = require("../controllers/fieldController")

router.route('/:dbId/field').post(createField)
router.route('/:dbId/updatefield').patch(updateField)
router.route('/:dbId/deletefield').delete(deleteField)
module.exports = router;