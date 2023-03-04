const express = require("express")
const router = express.Router()
const { createTable,updateTable,deleteTable,getTable } = require("../controllers/tableController")
const {checkAuthKey} = require("../middleWares/authKey")

const {decodeToken} = require("../middleWares/auth")

router.route('/:dbId/table').post(decodeToken,checkAuthKey,createTable)
router.route('/:dbId/:tableName/fetchtable').get(decodeToken,checkAuthKey,getTable)
router.route('/:dbId/:tableName/updatetable').patch(decodeToken,checkAuthKey,updateTable)
router.route('/:dbId/:tableName/deletetable').delete(decodeToken,checkAuthKey,deleteTable)

module.exports = router;