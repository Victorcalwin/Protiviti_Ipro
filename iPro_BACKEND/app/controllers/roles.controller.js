const db = require("../models");
const UserRoles = db.roles;
const Op = db.Sequelize.Op;
exports.getUserRoles = async (req, res, next) => {
  try {
    const data = await UserRoles.findAll()
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}