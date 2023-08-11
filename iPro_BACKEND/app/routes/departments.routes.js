const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments.Controller');
const validateJwt = require('../middleware/jwtTokenValid');
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
router.get('/Get_departments', departmentsController.getAllDepartments);
router.post('/Create_department', departmentsController.CreateDepartment);
router.post('/Update_department', departmentsController.UpdateDepartment);
router.get('/Remove_dept/:id', departmentsController.DeleteDepartment);
router.post('/Get_departmentsPOnCinema',departmentsController.getDepartmentsoncinema);
router.route('/Create_bulk_department').post(upload.single('excelFile'), departmentsController.BulkCreateDepartment)

module.exports = router;