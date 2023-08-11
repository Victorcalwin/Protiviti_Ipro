const express = require('express');
const router = express.Router();
const questionnairePDF = require('../controllers/downloadQuestionnairePDF.controller');

// Route for getting all departments
router.get('/', questionnairePDF.postQuestionnairePDF);

module.exports = router;