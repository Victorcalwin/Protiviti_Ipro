const express = require('express');
const router = express.Router();
const AuditScheduleQuestionnaireAnshwers = require('../controllers/audit_schedule_questionnaire_answers.Controller');

// Route for getting all departments
router.post('/getquestionssubmittedAnswer', AuditScheduleQuestionnaireAnshwers.getAllAuditScheduleQuestionnaireAnshwers);
router.post('/post_Answer', AuditScheduleQuestionnaireAnshwers.postAuditScheduleQuestionnaireAnshwers);
router.get('/Remove_ques/:id', AuditScheduleQuestionnaireAnshwers.DeleteQuestion);

module.exports = router;