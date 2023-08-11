const express = require('express');
const router = express.Router();
const deleteAttachentController = require('../controllers/deleteAttachment.controller');

// Route for getting all departments
router.get('/', deleteAttachentController.deleteAttachments);

module.exports = router;