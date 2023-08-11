const express = require('express');
const router = express.Router();
const performanceReportController = require('../controllers/performanceReport.controller');

// Route for getting all departments
router.get('/', performanceReportController.postPerformanceReport);

module.exports = router;