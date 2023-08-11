const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries.controller');

// Route for getting all departments
router.get('/', countriesController.getAllCountries);

module.exports = router;