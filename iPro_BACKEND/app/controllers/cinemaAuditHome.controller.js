const db = require("../models");
const cinemasAuditHome = db.role_assignments;
const Op = db.Sequelize.Op;
exports.postCinemaAuditHome = async (req, res, next) => {
  try {
    const data = await cinemasAuditHome.create({
      role_id: 2,
      user_id: 2
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}