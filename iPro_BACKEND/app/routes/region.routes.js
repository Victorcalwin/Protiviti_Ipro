const express = require('express');
const router = express.Router();
const auditStatusController = require('../controllers/regions.controller');

// Route for getting all departments
router.get('/Get_AllRegion', auditStatusController.GetAllregions);

module.exports = router;