const express = require('express');
const router = express.Router();
const updateUserStatusController = require('../controllers/updateUserStatus.controller');

// Route for getting all departments
router.get('/', updateUserStatusController.putUpdateUserStatus);

module.exports = router;