const express = require('express');
const router = express.Router();
const userUpdateNotification = require('../controllers/userUpdateNotification.controller');

// Route for getting all departments
router.get('/', userUpdateNotification.putUserUpdateNotification);

module.exports = router;