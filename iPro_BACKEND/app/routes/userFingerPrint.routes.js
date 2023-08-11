const express = require('express');
const router = express.Router();
const usersFingerPrintController = require('../controllers/userFingerPrint.controller');

// Route for getting all departments
router.get('/', usersFingerPrintController.putUserFingerPrint);

module.exports = router;