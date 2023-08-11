const db = require("../models");
const SendOTP = db.users;
const Op = db.Sequelize.Op;
exports.postSendOTP = async (req, res, next) => {
  try {
    const data = await SendOTP.create({
      mobile: 6301673087
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}