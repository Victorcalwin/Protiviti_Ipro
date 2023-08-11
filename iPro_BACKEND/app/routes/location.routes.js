const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

// Route for getting all departments
router.get('/', locationController.postLocation);

module.exports = router;