const express = require("express")
const router = express.Router()
const {createView,deleteView,deleteFieldInView} = require("../controllers/viewController")
const {commonAuth} = require("../middleWares/commonAuth")



router.route('/:dbId/view/:tableName').post(commonAuth,createView)
router.route('/:dbId/deleteview/:tableName').patch(commonAuth,deleteView)
router.route('/:dbId/deletefieldinview/:tableName').patch(commonAuth,deleteFieldInView)

module.exports = router;