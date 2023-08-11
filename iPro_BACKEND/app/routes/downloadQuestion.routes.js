const express = require('express');
const router = express.Router();
const downloadQuestion = require('../controllers/downloadQuestion.controller');

// Route for getting all departments
router.get('/', downloadQuestion.postDownloadQuestion);

module.exports = router;