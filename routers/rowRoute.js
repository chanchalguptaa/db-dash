const express = require("express")
const router = express.Router()
const { insertRow,deleteRow,updateRow } = require("../controllers/rowController")
const {checkAuthKey} = require("../middleWares/authKey")
const {decodeToken} = require("../middleWares/auth")

router.route('/:dbId/:tableName/row').post(decodeToken,checkAuthKey,insertRow)
router.route('/:dbId/:tableName/:row_id/rowupdate').patch(decodeToken,checkAuthKey,updateRow)
router.route('/:dbId/:tableName/:row_id/deleterow').delete(decodeToken,checkAuthKey,deleteRow)
module.exports = router;