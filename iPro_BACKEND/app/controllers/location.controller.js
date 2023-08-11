const db = require("../models");
const location = db.locations;
const Op = db.Sequelize.Op;
exports.postLocation = async (req, res, next) => {
  try {
    const data = await location.create({
      name: "Hazaribagh"
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}