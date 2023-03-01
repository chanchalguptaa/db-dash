const express = require('express');
const router = express.Router();
const {getAllOrgs,createOrg,getOrgById,updateOrg,deleteOrg,addUserInOrg,removeUserInOrg,getDbAccordingToOrg} = require('../Controllers/organizationController')


router.route('/').get(getAllOrgs);
router.route('/').post(createOrg);
router.route('/:id').get(getOrgById);
router.route('/:id/:adminId').patch(updateOrg);
router.route('/:id/:adminId').delete(deleteOrg);
router.route('/:id/adduser/:adminId').patch(addUserInOrg);
router.route('/:id/removeuser/:adminId').patch(removeUserInOrg);

module.exports = router;