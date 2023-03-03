const express = require("express")
const router = express.Router()
const {createDb,getAllDb,deleteDb,renameDb,getDbByOrgId,getDbById} = require("../controllers/dbController")
const {decodeToken} = require("../middleWares/auth")


router.route('/').get(decodeToken,getAllDb)
router.route('/:orgId/dbs').post(decodeToken,createDb)
router.route('/:orgId/dbs/:dbId').get(decodeToken,getDbById);
router.route('/:orgId/dbs/:id').delete(decodeToken,deleteDb)
router.route('/:orgId/dbs/:id').patch(decodeToken,renameDb)
router.route('/:org_id/alldbs').get(decodeToken,getDbByOrgId)


module.exports = router;


