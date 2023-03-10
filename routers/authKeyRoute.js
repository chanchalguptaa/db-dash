const express = require("express")
const router = express.Router()
const { createAuthKey,deleteAuthKey,updateAuthKey,getAuthKeys,getSingleAuthKey} = require("../controllers/authKeyController")

router.route('/:dbId/admin/:adminId/authkey').post(createAuthKey)
router.route('/:dbId/admin/:adminId/:authkey/update').patch(updateAuthKey)
router.route('/:dbId/admin/:adminId/:authkey/delete').delete(deleteAuthKey)
router.route('/:dbId/admin/:adminId/authKeys').get(getAuthKeys)
router.route('/:dbId/admin/:adminId/:authKey/authKey').get(getSingleAuthKey)

module.exports = router;            