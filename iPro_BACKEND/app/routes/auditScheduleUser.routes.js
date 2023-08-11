const express = require('express');
const router = express.Router();
const auditScheduleUser = require('../controllers/audit_schedule_users.controller');

// Route for getting all departments
router.get('/', auditScheduleUser.postAuditScheduleUser);

module.exports = router;