const db = require("../models");
const performanceReport = db.audit_schedules;
const Op = db.Sequelize.Op;
exports.postPerformanceReport = async (req, res, next) => {
  try {
    const data = await performanceReport.findAll()
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}