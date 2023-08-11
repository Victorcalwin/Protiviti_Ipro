const express = require('express');
const router = express.Router();
const cinemasDetails = require('../controllers/cinemaDetails.controller');

// Route for getting all departments
router.get('/:id', cinemasDetails.getAllCinemas);
router.post('/get-rgm', cinemasDetails.getRGM);

module.exports = router;