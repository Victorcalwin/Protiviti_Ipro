const express = require('express');
const router = express.Router();
const myAudits = require('../controllers/my_audits');

// Route for getting all departments
router.get('/ongoing', myAudits.getOngoingAudits);
router.get('/past',myAudits.getPastAudits);
router.post('/',myAudits.getFilterAudit);

module.exports = router;