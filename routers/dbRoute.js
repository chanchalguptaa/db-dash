const express = require("express")
const router = express.Router()
const {createDb,getAllDb,deleteDb,renameDb,getDbByOrgId} = require("../controllers/dbController")

router.route('/:orgId').get(getAllDb)
router.route('/:orgId').post(createDb)
router.route('/:orgId/dbs/:id').delete(deleteDb)
router.route('/:orgId/dbs/:id').patch(renameDb)
router.route('/:org_id/alldbs').get(getDbByOrgId)

module.exports = router;


