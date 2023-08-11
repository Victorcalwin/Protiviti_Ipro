const db = require("../models");
const questionnaireComment = db.audit_schedule_questionnaire_attachments;
const Op = db.Sequelize.Op;
exports.postQuestionnaireComment = async (req, res, next) => {
  try {
    const data = await questionnaireComment.create({
        audit_schedule_questionnaire_id:1,
        audit_schedule_id: 2,
        user_id: 5
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}