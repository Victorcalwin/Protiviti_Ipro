const express = require('express');
const router = express.Router();
const usersUpdateProfileController = require('../controllers/userUpdateProfile.controller');

// Route for getting all departments
router.get('/', usersUpdateProfileController.putUserUpdateProfile);

module.exports = router;