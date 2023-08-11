const db = require("../models");
const auditUpdateStatus = db.audit_schedules;
const Op = db.Sequelize.Op;
exports.putAuditUpdateCurrentStatus = async (req, res, next) => {
  try {
    const data = await auditUpdateStatus.update(
      {cinema_id:3, month: "Dec"},
      {where:{id:2}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}