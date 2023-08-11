const express = require('express');
const router = express.Router();
const questionnaireAttachments = require('../controllers/saveQuestionnaireAttachments.Controller');

// Route for getting all departments
router.get('/', questionnaireAttachments.postQuestionnaireAttachments);

module.exports = router;