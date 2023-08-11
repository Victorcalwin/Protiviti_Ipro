const express = require('express');
const router = express.Router();
const  validateOTPdepartmentsController = require('../controllers/validateOTP.controller');

// Route for getting all departments
router.get('/', validateOTPdepartmentsController.postvalidateOTP);

module.exports = router;