const express = require('express');
const router = express.Router();
const UserRoleController = require('../controllers/roles.controller');

// Route for getting all departments
router.get('/', UserRoleController.getUserRoles);

module.exports = router;