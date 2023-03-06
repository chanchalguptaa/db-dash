const express = require("express")
const router = express.Router()
const { createAuthKey,deleteAuthKey,updateAuthKey } = require("../controllers/authKeyController")

router.route('/:dbId/admin/:adminId/authkey').post(createAuthKey)
router.route('/:dbId/:authkey/:adminId/updateauthkey').patch(updateAuthKey)
router.route('/:dbId/:authkey/:adminId/deleteauthkey').delete(deleteAuthKey)
module.exports = router;