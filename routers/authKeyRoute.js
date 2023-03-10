const express = require("express")
const router = express.Router()
const { createAuthKey,deleteAuthKey,updateAuthKey,getAuthKeys} = require("../controllers/authKeyController")

router.route('/:dbId/admin/:adminId/authkey').post(createAuthKey)
router.route('/:dbId/admin/:adminId/:authkey/updateAuthkey').patch(updateAuthKey)
router.route('/:dbId/admin/:adminId/:authkey/deleteAuthkey').delete(deleteAuthKey)
router.route('/:dbId/admin/:adminId/authKeys').get(getAuthKeys)

module.exports = router;            