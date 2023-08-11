const express = require('express');
const router = express.Router();
const questionnaireCommentController = require('../controllers/questionnaireComment.controller');

// Route for getting all departments
router.get('/', questionnaireCommentController.postQuestionnaireComment);

module.exports = router;