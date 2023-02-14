const express = require("express")
const router = express.Router()
const { createTable ,updateTable} = require("../controllers/tableController")

router.route('/:dbId/table').post(createTable);
router.route('/:dbId/updatetable').post(updateTable)

module.exports = router;