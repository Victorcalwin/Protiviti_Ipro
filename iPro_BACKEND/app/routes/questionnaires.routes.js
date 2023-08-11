const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const questionnairescontroller = require('../controllers/questionnaires.controller');

const storage = multer.diskStorage({
    destination:'C:/images',
    filename:(req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  const upload = multer({storage:storage})

// Route for getting all departments
router.post('/Get_questions', questionnairescontroller.getAllquestion);
router.post('/Create_Question',upload.single('image'), questionnairescontroller.CreateQuestion);
router.post('/Upadate_Question',upload.single('image'), questionnairescontroller.UpadateQuestion);
router.get('/Remove_ques/:id', questionnairescontroller.DeleteQuestion);
router.post('/Get_questions_by_department', questionnairescontroller.GetQuestionByDepartment)
router.route('/Bulk_Question_Create').post(upload.single('excelFile'), questionnairescontroller.BulkQuestionCreate)
module.exports = router;