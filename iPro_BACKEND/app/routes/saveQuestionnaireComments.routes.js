const express = require('express');
const router = express.Router();
const questionnaireComments = require('../controllers/saveQuestionnaireComments.Controller');
const multer = require('multer');
const path = require('path');   

//Multer Config;
const storage = multer.diskStorage({
    destination:'C:/images',
    filename:(req,file,cb) => 
    { return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) }
    }) 
 
 const upload = multer({ storage });
// Route for getting all departments

router.route('/createObservation').post(upload.single('image'), questionnaireComments.postQuestionnaireComments)
router.post('/get-observation', questionnaireComments.GetQuestionnaireComments);

module.exports = router;