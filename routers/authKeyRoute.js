const express = require("express")
const router = express.Router()
const { createAuthKey,deleteAuthKey,updateAuthKey } = require("../controllers/authKeyController")

router.route('/:dbId/admin/:adminId/authkey').post(createAuthKey)
router.route('/:dbId/admin/:adminId/:authkey/updateAuthkey').patch(updateAuthKey)
router.route('/:dbId/admin/:adminId/:authkey/deleteAuthkey').delete(deleteAuthKey)
// http://localhost:5000/dbs/63ee161e728e3e9ab145f0e7/admin/63e603b25514ae381dfda3fb/AUR0fX7X/updateAuthkey
module.exports = router;