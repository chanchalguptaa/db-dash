const express = require("express")
const router = express.Router()
const { insertRow } = require("../controllers/rowController")

router.route('/:dbId/:tableName/row').post(insertRow)
// router.route('/:dbId/:tableName/updatefield').patch(updateField)
// router.route('/:dbId/:tableName/deletefield').delete(deleteField)
module.exports = router;