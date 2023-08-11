const db = require("../models");
const downloadQuestion = db.audit_schedule_questionnaires;
const Op = db.Sequelize.Op;
exports.postDownloadQuestion = async (req, res, next) => {
  try {
    const data = await downloadQuestion.findAll()
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}