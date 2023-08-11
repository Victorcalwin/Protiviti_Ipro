const db = require("../models");
const deleteAttachment = db.audit_schedule_questionnaire_attachments;
const Op = db.Sequelize.Op;
exports.deleteAttachments = async (req, res, next) => {
  try {
    const data = await deleteAttachment.destroy(
        {where:{user_id:1}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}