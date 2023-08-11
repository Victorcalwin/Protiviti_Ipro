const db = require("../models");
const UserUpdateProfileImage = db.users;
const Op = db.Sequelize.Op;
exports.putUserUpdateProfileImage = async (req, res, next) => {
  try {
    const data = await UserUpdateProfileImage.update(
      {username: "Rinku"},
      {where:{id:3}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}