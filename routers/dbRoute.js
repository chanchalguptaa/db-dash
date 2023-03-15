const express = require("express")
const router = express.Router()
const {createDb,getAllDb,deleteDb,renameDb,getDbByOrgId,getDbById} = require("../controllers/dbController")
const {decodeToken} = require("../middleWares/auth")

router.route('/').get(getAllDb)
router.route('/:orgId/dbs').post(createDb)
router.route('/dbs/:dbId').get(getDbById);
router.route('/:orgId/dbs/:id').delete(deleteDb)
router.route('/:orgId/dbs/:id').patch(renameDb)
router.route('/:org_id/alldbs').get(getDbByOrgId)


module.exports = router;


