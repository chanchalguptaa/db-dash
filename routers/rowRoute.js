const express = require("express")
const router = express.Router()
const { insertRow,deleteRow,updateRow } = require("../controllers/rowController")
const {checkAuthKey} = require("../middleWares/authKey")

router.route('/:dbId/:tableName/row').post(checkAuthKey,insertRow)
router.route('/:dbId/:tableName/:row_id/rowupdate').patch(checkAuthKey,updateRow)
router.route('/:dbId/:tableName/:row_id/deleterow').delete(checkAuthKey,deleteRow)
module.exports = router;