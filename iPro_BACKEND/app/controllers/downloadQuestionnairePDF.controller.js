const db = require("../models");
const questionnairePDF = db.audit_schedule_questionnaires;
const Op = db.Sequelize.Op;
exports.postQuestionnairePDF = async (req, res, next) => {
  try {
    const data = await questionnairePDF.findAll()
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}