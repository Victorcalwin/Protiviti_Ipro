const db = require("../models");
const questionnaireAttachments= db.audit_schedule_questionnaire_attachments;
const Op = db.Sequelize.Op;
exports.postQuestionnaireAttachments = async (req, res, next) => {
  try {
    const data = await questionnaireAttachments.create({
      user_id: 1,
      audit_schedule_id: 1
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}