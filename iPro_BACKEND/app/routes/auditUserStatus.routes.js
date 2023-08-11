const express = require('express');
const router = express.Router();
const auditStatusController = require('../controllers/auditUserStatus.controller');

// Route for getting all departments
router.get('/', auditStatusController.putAuditStatus);

module.exports = router;