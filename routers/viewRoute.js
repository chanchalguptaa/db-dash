const express = require("express")
const router = express.Router()
const {createView,deleteView} = require("../controllers/viewController")

router.route('/:dbId/view/:tableName').post(createView)
router.route('/:dbId/deleteview/:tableName').patch(deleteView)
// router.route('/:dbId/deleteview:/viewId').delete()

module.exports = router;