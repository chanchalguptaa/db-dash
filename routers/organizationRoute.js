const express = require('express');
const router = express.Router();
const {getAllOrgs,createOrg,getOrgById,updateOrg,deleteOrg,addUserInOrg,removeUserInOrg} = require('../Controllers/organizationController')


router.route('/').get(getAllOrgs);
router.route('/').post(createOrg);
router.route('/:id').get(getOrgById);
router.route('/:id').patch(updateOrg);
router.route('/:id').delete(deleteOrg);
router.route('/:id/adduser').patch(addUserInOrg);
router.route('/:id/removeuser').patch(removeUserInOrg)
module.exports = router;