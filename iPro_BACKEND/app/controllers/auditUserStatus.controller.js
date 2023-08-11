const db = require("../models");
const auditStatus = db.audit_schedules;
const Op = db.Sequelize.Op;
exports.putAuditStatus = async (req, res, next) => {
  try {
    const data = await auditStatus.update(
      {cinema_id:1, month: "Aug"},
      {where:{id:2}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}