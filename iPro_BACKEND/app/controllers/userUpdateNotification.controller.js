const db = require("../models");
const UserUpdateNotification = db.user_notifications;
const Op = db.Sequelize.Op;
exports.putUserUpdateNotification = async (req, res, next) => {
  try {
    const data = await UserUpdateNotification.update(
      {message: "Hello World"},
      {where:{id:1}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}