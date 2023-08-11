const express = require('express');
const router = express.Router();
const auditUpdateStatusController = require('../controllers/auditUpdateCurrentStatus.controller');

// Route for getting all departments
router.get('/', auditUpdateStatusController.putAuditUpdateCurrentStatus);

module.exports = router;