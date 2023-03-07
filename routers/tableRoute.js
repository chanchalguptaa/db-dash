const express = require("express")
const router = express.Router()
const { createTable,updateTable,deleteTable,getTable } = require("../controllers/tableController")
const {commonAuth} = require("../middleWares/commonAuth")


router.route('/:dbId/table').post(commonAuth,createTable)
router.route('/:dbId/:tableName/fetchtable').get(commonAuth,getTable)
router.route('/:dbId/:tableName/updatetable').patch(commonAuth,updateTable)
router.route('/:dbId/:tableName/deletetable').delete(commonAuth,deleteTable)

module.exports = router;