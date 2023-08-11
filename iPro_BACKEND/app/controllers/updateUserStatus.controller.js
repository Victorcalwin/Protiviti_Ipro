const db = require("../models");
const userStatusUpdate = db.users;
const Op = db.Sequelize.Op;
exports.putUpdateUserStatus = async (req, res, next) => {
  try {
    const data = await userStatusUpdate.update(
      {status: "active"},
      {where:{id:3}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}