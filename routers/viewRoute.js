const express = require("express")
const router = express.Router()
const {createView} = require("../controllers/viewController")

router.route('/:dbId/view/:tableName').post(createView)
// router.route('/:dbId/updateview/:viewId').patch()
// router.route('/:dbId/deleteview:/viewId').delete()

module.exports = router;