const db = require("../models");
const UserNotification = db.user_notifications;
const Op = db.Sequelize.Op;
exports.getUserNotification = async (req, res, next) => {
  try {
    const data = await UserNotification.findAll()
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}