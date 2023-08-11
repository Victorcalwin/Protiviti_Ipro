const express = require('express');
const router = express.Router();
const cinemas = require('../controllers/cinemaMasterData.controller');

// Route for getting all departments
router.get('/', cinemas.postCinemaMasterData);

module.exports = router;