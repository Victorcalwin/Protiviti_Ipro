const express = require('express');
const router = express.Router();
const userPermission = require('../controllers/audit_schedule_user_permissions.controller');

// Route for getting all departments
router.get('/', userPermission.postAuditScheduleUserPermission);

module.exports = router;