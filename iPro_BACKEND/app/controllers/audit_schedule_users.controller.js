const db = require("../models");
const user = db.audit_schedule_users;
const Op = db.Sequelize.Op;
exports.postAuditScheduleUser = async (req, res, next) => {
  try {
    const data = await user.create({
      audit_schedule_id: 1,
      user_id: 1,
      role_id: 1,
      current_status: 1
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}