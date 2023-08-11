const db = require("../models");
const questionnaireAttachment = db.audit_schedule_questionnaire_attachments;
const Op = db.Sequelize.Op;
exports.postQuestionnaireAttachment = async (req, res, next) => {
  try {
    const data = await questionnaireAttachment.create({
      user_id: 1,
      audit_schedule_id: 1
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}