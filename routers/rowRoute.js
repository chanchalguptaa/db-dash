const express = require("express")
const router = express.Router()
const { insertRow,deleteRow,updateRow } = require("../controllers/rowController")

router.route('/:dbId/:tableName/row').post(insertRow)
router.route('/:dbId/:tableName/:row_id/rowupdate').patch(updateRow)
router.route('/:dbId/:tableName/:row_id/deleterow').delete(deleteRow)
module.exports = router;