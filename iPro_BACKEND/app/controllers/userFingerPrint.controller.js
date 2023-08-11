const db = require("../models");
const UserFingerPrint = db.users;
const Op = db.Sequelize.Op;
exports.putUserFingerPrint = async (req, res, next) => {
  try {
    const data = await UserFingerPrint.update(
      {first_name: "Rinku", last_name: "Kumar"},
      {where:{id:3}}
      )
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}