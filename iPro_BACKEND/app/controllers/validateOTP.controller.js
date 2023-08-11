const db = require("../models");
const validateOTP = db.user_otps;
const Op = db.Sequelize.Op;
exports.postvalidateOTP = async (req, res, next) => {
  try {
    const data = await validateOTP.create({
      user_id:  1,
      otp: 234567
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}