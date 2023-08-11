const db = require("../models");
const CinemasDetails = db.cinemas;
const Op = db.Sequelize.Op;
// exports.getAllCinemas = async (req, res, next) => {
//   try {
//     const data = await CinemasDetails.findAll()
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// }

exports.getAllCinemas = async (req, res, next) => {
  try {
    let userData  = req.params.id
    console.log(userData);
  const [CinemasDetails, meta] = await db.sequelize
  .query("SELECT auds.*, cm.name, cm.address, cm.latitude, cm.longitude, auds.created_on, auds.notification_status  FROM `audit_schedule_users` asu Join audit_schedules auds on auds.id = asu.audit_schedule_id JOIN cinemas cm on cm.id = auds.cinema_id WHERE `user_id` = '"+userData+"'ORDER BY auds.id DESC")
  // SELECT auds.*, cm.name FROM `audit_schedule_users` asu Join audit_schedules auds on auds.id = asu.audit_schedule_id JOIN cinemas cm on cm.id = auds.cinema_id WHERE `user_id` = 3; San
  .catch ((error) =>{
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    })
    res
    .status(200)
    .send({CinemasDetails: CinemasDetails})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.getRGM = async (req, res, next) => {

  
  let input = {
    auditId : req.body.auditId,
    deptId : req.body.deptId
  }
  try {
  const [CinemasDetails, meta] = await db.sequelize
  .query("SELECT asd.audit_status, asd.id as audit_id, asd.scheduling_type,asd.auditName, DATE_FORMAT(asd.start_date, '%d-%m-%Y') as start_date, DATE_FORMAT(asd.end_date, '%d-%m-%Y') as end_date, cdm.department_id ,u.username as Rgm FROM `cinemas` cm JOIN `audit_schedules` asd ON asd.cinema_id=cm.id JOIN `cinemas_departments` cdm ON cdm.cinema_id = cm.id JOIN `users` u ON u.id = cdm.department_Manager WHERE asd.id ="+input.auditId+" AND cdm.department_id ="+input.deptId)
  .catch ((error) =>{
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    })
    console.log(CinemasDetails, "jfcgjfcgf")
    res
    .status(200)
    .send({CinemasDetails: CinemasDetails})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}