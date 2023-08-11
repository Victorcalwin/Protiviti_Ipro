const db = require("../models");
const UserResetPassword = db.user_passwords;
const Op = db.Sequelize.Op;
exports.putUserResetPassword = async (req, res, next) => {
  try {
    const data = await UserResetPassword.update(
      {password:098776654323},
      {where:{user_id:1}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}