const express = require("express")
const router = express.Router()
const {createDb,getAllDb,deleteDb,renameDb,getDbByOrgId} = require("../controllers/dbController")
const { createTable,updateTable } = require("../controllers/tableController")

router.route('/').get(getAllDb)
router.route('/').post(createDb)
router.route('/:id').delete(deleteDb)
router.route('/rename/:id').patch(renameDb)
router.route('/:id').patch()
router.route('/byOrg/:org_id').get(getDbByOrgId)
router.route('/addtable').post(createTable)
router.route('/updatetable').post(updateTable)
module.exports = router;


