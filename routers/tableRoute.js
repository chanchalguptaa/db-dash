const express = require("express")
const router = express.Router()
const { createTable } = require("../controllers/tableController")

router.route('/addtable').post(createTable)

module.exports = router;