const express = require("express")
const router = express.Router()
const { insertRow,getRow,deleteRow,updateRow } = require("../controllers/rowController")
const {checkAuthKey} = require("../middleWares/authKey")
const {decodeToken} = require("../middleWares/auth")
const {commonAuth} = require("../middleWares/commanAuth")

router.route('/:dbId/:tableName').get(getRow)
router.route('/:dbId/:tableName/row').post(commonAuth,insertRow)
router.route('/:dbId/:tableName/:row_id/rowupdate').patch(commonAuth,updateRow)
router.route('/:dbId/:tableName/:row_id/deleterow').delete(commonAuth,deleteRow)
module.exports = router;