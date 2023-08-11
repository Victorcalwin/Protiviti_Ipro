const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

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
router.post('/', usersController.userLogin);
router.get('/', usersController.postUserLogin);
router.get('/Get_Users', usersController.GetAllUser);
router.post('/Get_FilterUsers', usersController.GetUser);
router.post('/create_user', usersController.CreateUser)
router.post('/update_user', usersController.updateUser)
router.get('/Remove_user/:id', usersController.DeleteUser);
router.get('/get_role', usersController.GetRole);
router.post('/get-required-actions', usersController.getRequiredActions);
router.post('/update-notification-status', usersController.updateNotificationStatus);
router.route('/Create_bulk_user').post(upload.single('excelFile'), usersController.CreateBulkUser)

//user Email;
router.post('/login', usersController.UserEmailLogin);
router.post('/otp', usersController.otpValidation);

module.exports = router;