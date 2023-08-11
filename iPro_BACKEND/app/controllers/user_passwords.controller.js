const db = require("../models");
const UserPassword = db.user_passwords;
const Op = db.Sequelize.Op;
exports.putUserPassword = async (req, res, next) => {
  try {
    const data = await UserPassword.update(
      {password:12345678},
      {where:{id:6}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}