const express = require("express")
const router = express.Router()
const {createView,deleteView,deleteFieldInView} = require("../controllers/viewController")
const {checkAuthKey} = require("../middleWares/authKey")
const {decodeToken} = require("../middleWares/auth")


router.route('/:dbId/view/:tableName').post(decodeToken,checkAuthKey,createView)
router.route('/:dbId/deleteview/:tableName').patch(decodeToken,checkAuthKey,deleteView)
router.route('/:dbId/deletefieldinview/:tableName').patch(decodeToken,deleteFieldInView)

module.exports = router;