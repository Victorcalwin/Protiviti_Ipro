const db = require("../models");
const UserUpdateProfile = db.users;
const Op = db.Sequelize.Op;
exports.putUserUpdateProfile = async (req, res, next) => {
  try {
    const data = await UserUpdateProfile.update(
      {username:"Dharmendra", first_name:"Dharmendra", lastname: "Singh", mobile:9876543210},
      {where:{id:2}})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}