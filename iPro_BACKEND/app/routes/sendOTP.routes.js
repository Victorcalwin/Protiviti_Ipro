const express = require('express');
const router = express.Router();
const sendOTPController = require('../controllers/sendOTP.controller');

// Route for getting all departments
router.get('/', sendOTPController.postSendOTP);

module.exports = router;