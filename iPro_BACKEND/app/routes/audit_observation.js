const express = require('express');
const router = express.Router();
const audit_observation = require('../controllers/audit_observation.controller.js');
const multer = require('multer');
const path = require('path');   

//Multer Config;
const storage = multer.diskStorage({
    destination:'C:/images',
    filename:(req,file,cb) => 
    { return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) }
    }) 
 
 const upload = multer({ storage });

router.route('/audit-obser-submit').post(upload.single('image'), audit_observation.auditobsersubmit)

// router.post('/audit-obser-submit', audit_observation.auditobsersubmit)
module.exports = router;