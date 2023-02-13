const express = require("express")
const router = express.Router()
const {createDb,getAllDb,deleteDb,renameDb} = require("../controllers/dbController")

router.route('/').get(getAllDb)
router.route('/').post(createDb)
router.route('/:id').delete(deleteDb)
router.route('/rename/:id').patch(renameDb)
router.route('/:id').patch()
module.exports = router;


