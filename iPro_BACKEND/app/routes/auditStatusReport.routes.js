const express = require('express');
const router = express.Router();
const validateJwt = require('../middleware/jwtTokenValid');
const auditStatusController = require('../controllers/auditStatusReport.controller');
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
router.post('/Get_AllAudit', auditStatusController.GetAllAudit);
router.post('/Status_Audit',validateJwt, auditStatusController.StatusAudit);
router.post('/Create_audit', auditStatusController.postAuditStatus);
router.post('/Update_audit', auditStatusController.updateAudit);
router.post('/Delete_audit', auditStatusController.deleteAudit);
router.post('/update-audit-status', auditStatusController.updateAuditStatus);
router.post('/submit-edit-Audit-Answer', auditStatusController.submitEditAuditAnswer);
router.post('/submit-status-ques-escstatus', auditStatusController.submitStausofLow);
router.post('/submit-status-ques-observations', auditStatusController.submitStausofObservation);
router.post('/submit-Audit-Answer', upload.single('image'), auditStatusController.submitAuditAnswer)
router.post('/changeQuesImage',upload.single('image'), auditStatusController.changequesImage);
router.post('/QuesRemedImage',upload.single('image'), auditStatusController.changequesremediationImage);
router.route('/excel-bulk-upload').post(upload.single('excelFile'), auditStatusController.excelBulkUpload)
router.post('/GetRemediationImage', auditStatusController.getRemediationImages);
router.post('/UpdateReport/:id', auditStatusController.UpdateReport);
module.exports = router;