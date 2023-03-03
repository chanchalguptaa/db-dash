const express = require("express")
const router = express.Router()
const { createTable,updateTable,deleteTable,getTable } = require("../controllers/tableController")
const {checkAuthKey} = require("../middleWares/authKey")

const {decodeToken} = require("../middleWares/auth")

router.route('/:dbId/table').post(decodeToken,createTable)
router.route('/:dbId/:tableName/fetchtable').get(checkAuthKey,getTable)
router.route('/:dbId/:tableName/updatetable').patch(checkAuthKey,updateTable)
router.route('/:dbId/:tableName/deletetable').delete(checkAuthKey,deleteTable)

module.exports = router;