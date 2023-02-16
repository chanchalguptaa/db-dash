const express = require("express")
const router = express.Router()
const {createView,deleteView,deleteFieldInView} = require("../controllers/viewController")

router.route('/:dbId/view/:tableName').post(createView)
router.route('/:dbId/deleteview/:tableName').patch(deleteView)
router.route('/:dbId/deletefieldinview/:tableName').patch(deleteFieldInView)

module.exports = router;