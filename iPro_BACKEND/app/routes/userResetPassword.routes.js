const express = require('express');
const router = express.Router();
const userResetPasswordController = require('../controllers/userResetPassword.controller');

// Route for getting all departments
router.get('/', userResetPasswordController.putUserResetPassword);

module.exports = router;