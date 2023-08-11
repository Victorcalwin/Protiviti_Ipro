const express = require('express');
const router = express.Router();
const cinemasAuditHome = require('../controllers/cinemaAuditHome.controller');

// Route for getting all departments
router.get('/', cinemasAuditHome.postCinemaAuditHome);

module.exports = router;