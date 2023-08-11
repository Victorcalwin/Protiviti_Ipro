const express = require('express');
const router = express.Router();
const userPasswordController = require('../controllers/user_passwords.controller');

// Route for getting all departments
router.get('/', userPasswordController.putUserPassword);

module.exports = router;