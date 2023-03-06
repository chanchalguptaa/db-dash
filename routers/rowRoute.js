const express = require("express")
const router = express.Router()
const { insertRow,deleteRow,updateRow } = require("../controllers/rowController")
const {commonAuth} = require("../middleWares/commanAuth")


router.route('/:dbId/:tableName/row').post(commonAuth,insertRow)
router.route('/:dbId/:tableName/:row_id/rowupdate').patch(commonAuth,updateRow)
router.route('/:dbId/:tableName/:row_id/deleterow').delete(commonAuth,deleteRow)
module.exports = router;