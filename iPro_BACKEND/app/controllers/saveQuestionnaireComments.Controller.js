const db = require("../models");
const questionnaireComments = db.audit_schedule_questionnaire_comments;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.postQuestionnaireComments = async (req, res, next) => {
  console.log(req.file,"dddfdf")
  try {
    if(req.body && !Object.keys(req.body).includes('data')){
      req.body = {...req.body,"data":req.body ? req.body : {}}
    }
    if(req.file){
      const [questionnaireComments, meta]=await db.sequelize
      .query("INSERT INTO `audit_schedule_questionnaire_comments`(`user_id`, `Role_Id`, `audit_schedule_id`, `department_Id`, `audit_schedule_questionnaire_id`, `comments`, `file_name`, `file_path`, `mime_type`) VALUES ('"+req.body.data.user_id+"', '"+req.body.data.Role_Id+"', '"+req.body.data.audit_schedule_id+"','"+req.body.data.department_Id+"','"+req.body.data.audit_schedule_questionnaire_id+"','"+req.body.data.comments+"','"+req.file.filename+"', '"+req.file.destination+"','"+req.file.mimetype+"')")
    }else{
      const [questionnaireComments, meta]=await db.sequelize
      .query("INSERT INTO `audit_schedule_questionnaire_comments`(`user_id`, `Role_Id`, `audit_schedule_id`, `department_Id`, `audit_schedule_questionnaire_id`, `comments`) VALUES ('"+req.body.data.user_id+"', '"+req.body.data.Role_Id+"', '"+req.body.data.audit_schedule_id+"','"+req.body.data.department_Id+"','"+req.body.data.audit_schedule_questionnaire_id+"','"+req.body.data.comments+"')")
    }
   
    res.status(200).json(questionnaireComments);
    // const data = await questionnaireComments.create(req.body.data)
    // res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.GetQuestionnaireComments = async (req, res, next) => {
  try {
    let query = "SELECT asqo.*, CONCAT_WS(' ', u.`first_name`, u.`last_name`) as username, u.email as userEmail, u.mobile as userMobile, r.name as rolename FROM `audit_schedule_questionnaire_comments` asqo JOIN users u on u.id = asqo.user_id JOIN roles r on r.id = u.role_id WHERE 1=1"
    if(req.body.auditId){
      query += " And audit_schedule_id = " + req.body.auditId + ""
    }
    if(req.body.deptId){
      query += " AND department_Id = " + req.body.deptId + ""
    }

    const [data, meta] = await db.sequelize.query(query)
    const distinctQuestionIds = [...new Set(data.map(item => item.audit_schedule_questionnaire_id))];
    
    
    const result = distinctQuestionIds.map(questionId => ({
      questionId: questionId,
      observations: data.filter(item => item.audit_schedule_questionnaire_id === questionId)
    }));
    // console.log(result, "sdknfbnksdfksfdsf")
    
    questions = result
    // console.log(questions, "sdknfbnksdfksfdsf")
    // console.log(questions.observations[0].file_path,"ksdfojsdof")
    // for (let i = 0; i < questions.observations.length; i++) {
    //   if (questions.observations[i].file_path !== null && questions.observations[i].file_path !==''){
    //     const imagePath = path.join(questions.observations[i].file_path, questions.observations[i].file_name);

    //     console.log(imagePath, "sdfbksdbfksdbfk")

    questions = result 
    console.log(questions.length)
    for(let j = 0; j<questions.length; j ++){
      for (let i = 0; i < questions[j].observations.length; i++) {
      if (questions[j].observations[i].file_path !== null && questions[j].observations[i].file_path !==''){
        const imagePath = path.join(questions[j].observations[i].file_path, questions[j].observations[i].file_name);

        const image = await new Promise((resolve, reject) => {
          fs.readFile(imagePath, (err, data) => {
            if (err) {
              reject(err);
            } else {  
              resolve(data);
            }
          });
        });

        const compressedImage = await sharp(image)
          .resize(800, 600)
          .jpeg({ quality: 80 })
          .toBuffer();

        let imageurl = compressedImage.toString('base64');
        let contentType = 'image/jpg';
        if(questions[j].observations[i].file_path.endsWith('.PNG')) {
          contentType = 'image/png';
        }
        questions[j].observations[i].file_path = "data:" + contentType + ";base64, " + imageurl;
      }
    }
    }
    
    res.set('Content-Type', 'application/json');

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}