const express = require('express');
const router = express.Router();
const AuditScheduleDepartments = require('../controllers/audit_schedule_departments.Controller');

// Route for getting all departments
router.post('/GetAuditBasedDepartment', AuditScheduleDepartments.GetAuditBasedDepartment);
router.post('/update-audit-status', AuditScheduleDepartments.UpdateAuditStatus);

module.exports = router;