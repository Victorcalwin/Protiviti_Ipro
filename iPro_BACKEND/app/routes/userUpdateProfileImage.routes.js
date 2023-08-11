const express = require('express');
const router = express.Router();
const usersUpdateProfileImageController = require('../controllers/userUpdateProfileImage.controller');

// Route for getting all departments
router.get('/', usersUpdateProfileImageController.putUserUpdateProfileImage);

module.exports = router;