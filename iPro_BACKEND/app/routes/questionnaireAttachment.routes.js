const express = require('express');
const router = express.Router();
const questionnaireAttachmentController = require('../controllers/questionnaireAttachment.controller');

// Route for getting all departments
router.get('/', questionnaireAttachmentController.postQuestionnaireAttachment);

module.exports = router;