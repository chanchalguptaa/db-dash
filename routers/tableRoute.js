const express = require("express")
const router = express.Router()
const { createTable,updateTable,deleteTable,getTable } = require("../controllers/tableController")

router.route('/:dbId/table').post(createTable)
router.route('/:dbId/:tableName/fetchtable').get(getTable)
router.route('/:dbId/updatetable').patch(updateTable)
router.route('/:dbId/deletetable').delete(deleteTable)
module.exports = router;