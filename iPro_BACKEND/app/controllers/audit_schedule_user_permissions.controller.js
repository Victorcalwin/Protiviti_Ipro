const db = require("../models");
const userPermission = db.audit_schedule_user_permissions;
const Op = db.Sequelize.Op;
exports.postAuditScheduleUserPermission = async (req, res, next) => {
  try {
    const data = await userPermission.create({
      audit_schedule_id:1
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}