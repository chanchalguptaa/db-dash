const express = require("express")
const router = express.Router()
const { createAuthKey,deleteAuthKey } = require("../controllers/authKeyController")

router.route('/:dbId/authkey').post(createAuthKey)
router.route('/:dbId/:authkey/deleteauthkey').delete(deleteAuthKey)
module.exports = router;