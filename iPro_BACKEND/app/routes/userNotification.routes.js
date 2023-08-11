const express = require('express');
const router = express.Router();
const userNotification = require('../controllers/userNotification.controller');

// Route for getting all departments
router.get('/', userNotification.getUserNotification);

module.exports = router;