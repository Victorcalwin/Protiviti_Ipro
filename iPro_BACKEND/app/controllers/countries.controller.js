const db = require("../models");
const Countries = db.countries;
const Op = db.Sequelize.Op;
exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await Countries.findAll()
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}