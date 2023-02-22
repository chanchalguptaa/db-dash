const express = require("express")
const router = express.Router()
const {createView,deleteView,deleteFieldInView} = require("../controllers/viewController")
const {checkAuthKey} = require("../middleWares/authKey")

router.route('/:dbId/view/:tableName').post(checkAuthKey,createView)
router.route('/:dbId/deleteview/:tableName').patch(checkAuthKey,deleteView)
router.route('/:dbId/deletefieldinview/:tableName').patch(checkAuthKey,deleteFieldInView)

module.exports = router;