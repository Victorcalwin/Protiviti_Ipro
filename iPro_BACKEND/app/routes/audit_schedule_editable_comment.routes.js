const express = require('express');
const router = express.Router();
const questionnaireEditsObservation = require('../controllers/audit_schedule_editable_comment.Controller');


router.post('/', questionnaireEditsObservation.postQuestionnairEditObservation);
router.post('/geteditComment', questionnaireEditsObservation.getQuestionnairEditObservation);


module.exports = router;