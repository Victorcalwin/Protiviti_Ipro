const express = require('express');
const router = express.Router();
const questionnaire = require('../controllers/auditScheduleQuestionnaireByDepartment.controller.js');

// Route for getting all departments
router.post('/', questionnaire.postAuditScheduleQuestionnaireByDepartment);
router.post('/ALL', questionnaire.postAuditScheduleQuestionnaireByDepartmentALL);


module.exports = router;