const express = require("express")
const router = express.Router()
const { createTable } = require("../controllers/tableController")

router.route('/:dbId/table').post(createTable)

module.exports = router;