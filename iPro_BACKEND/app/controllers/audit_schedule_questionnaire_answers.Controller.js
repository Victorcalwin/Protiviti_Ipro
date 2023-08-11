const db = require("../models");
const audit_schedule_questionnaire_answers = db.audit_schedule_questionnaire_answers;
const Op = db.Sequelize.Op;
exports.getAllAuditScheduleQuestionnaireAnshwers = async (req, res, next) => {
  try {
    let auditId = req.body.auditId;
    let questionId = req.body.questionId;
    let userId = req.body.userId;

    let query = "SELECT * FROM `audit_schedule_questionnaire_answers` WHERE 1=1"
     if(auditId == '' || auditId == null){
       query += " And audit_schedule_id = "+auditId
     }
     if(questionId == '' || questionId == null){
      query += " And audit_schedule_questionnaire_id = "+questionId
    }
    if(userId == '' || userId == null){
      query += " And user_id = "+userId
    }

    const [data, meta] = await db.sequelize.query(query)
    res.status(200)
       .send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.postAuditScheduleQuestionnaireAnshwers = async (req, res, next) => {
  try {
    const data = await audit_schedule_questionnaire_answers.create(req.body)
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.DeleteQuestion = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [Cinemas,meta]=await db.sequelize
    .query('DELETE FROM `audit_schedule_questionnaires` WHERE id="'+Id+'"')
    res.status(200).json({message:'successfully deleted'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}