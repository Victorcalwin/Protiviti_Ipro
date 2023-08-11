const express = require('express');
const router = express.Router();
const cinemas = require('../controllers/cinemas.controller');
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
router.get('/', cinemas.postAllCinemas);
router.post('/Get_AllCinemas', cinemas.getAllCinemas);
router.get('/Get_AllRegions', cinemas.getAllRegions);
router.get('/Get_All_State_By_Region/:id', cinemas.getAllStateByRegion);
router.get('/Get_All_Cities_By_State/:id', cinemas.getAllCitesByState);
router.post('/Add_New_Cinema', cinemas.AddNewCinema);
router.route('/bulk_cinemas').post(upload.single('excelFile'), cinemas.BulkCinemas)
router.get('/Remove_Cinema/:id', cinemas.DeleteCinema);
router.post('/Update_Cinema/:id', cinemas.UpdateCinema)
module.exports = router;