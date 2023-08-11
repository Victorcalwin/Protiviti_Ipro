const express = require('express');
const router = express.Router();
const myAudits = require('../controllers/notification.controller');

// Route for getting all departments
router.post('/push-notification-non-compliance',myAudits.pushNotificationForNonComplianceAnswer);
router.post('/:id',myAudits.updateNotification);

module.exports = router;