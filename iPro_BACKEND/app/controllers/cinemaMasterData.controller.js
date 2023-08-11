const db = require("../models");
const Cinemas = db.cinemas;
const Op = db.Sequelize.Op;
exports.postCinemaMasterData = async (req, res, next) => {
  try {
    const data = await Cinemas.create({
        scheduling_type: "cinema",
        cinema_id: 21,
        audit_status: "pending",
        month: "AUG",
        previous_audit_Score: "234"
      })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}