const db = require("../models");
const region = db.regions;
const Op = db.Sequelize.Op;


exports.GetAllregions = async (req, res, next) => {
  try {
    const [data,meta] = await db.sequelize.query("SELECT r.*, CONCAT_WS(' ', u.`first_name`, u.`last_name`) as username, u.email as userEmail, u.mobile as userMobile FROM `regions` r left Join `users` u on u.id = r.Regional_Director;")
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
