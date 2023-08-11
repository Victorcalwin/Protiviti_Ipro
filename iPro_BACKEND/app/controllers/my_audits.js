const db = require("../models");
const myAudits = db.audit_schedules;
const Op = db.Sequelize.Op;


exports.getOngoingAudits = async (req, res, next) => {
  try {
  const [myAudits, meta] = await db.sequelize
  .query("SELECT cm.*, asd.audit_status, asd.id as audit_id, asd.scheduling_type,asd.auditName, DATE_FORMAT(asd.start_date, '%d-%m-%Y') as start_date, DATE_FORMAT(asd.end_date, '%d-%m-%Y') as end_date FROM `cinemas` cm JOIN `audit_schedules` asd ON asd.cinema_id=cm.id  WHERE `audit_status` LIKE 'Sent%' OR `audit_status` LIKE 'In%'")
  .catch ((error) =>{
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    })
    res.status(200).json({Ongoing: myAudits})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getPastAudits = async (req, res, next) => {
    try {
    const [myAudits, meta] = await db.sequelize
    .query("SELECT cm.*, asd.audit_status, asd.id as audit_id, asd.scheduling_type,asd.auditName, DATE_FORMAT(asd.start_date, '%d-%m-%Y') as start_date, DATE_FORMAT(asd.end_date, '%d-%m-%Y') as end_date FROM `cinemas` cm JOIN `audit_schedules` asd ON asd.cinema_id=cm.id  WHERE `audit_status` LIKE 'Closed%'")
    .catch ((error) =>{
        console.log(error);
        res.status(500).json({ message: "Server Error" });
      })
      res
      .status(200)
      .json({Past: myAudits})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  exports.getFilterAudit = async (req, res, next) => {
    try {
      const From = req.body.from;
      const To = req.body.to;
      const Status = req.body.status;

    const [myAudits, meta] = await db.sequelize
    .query("SELECT cm.*, asd.audit_status, asd.id as audit_id, asd.scheduling_type, asd.auditName,asd.start_date, asd.end_date FROM `cinemas` cm JOIN `audit_schedules` asd ON asd.cinema_id=cm.id WHERE `audit_status` LIKE '"+Status+"%' AND asd.start_date BETWEEN '"+From+"' AND '"+From+"' AND asd.end_date BETWEEN '"+To+"' AND '"+To+"'")
    .catch ((error) =>{
        console.log(error);
        res.status(500).json({ message: "Server Error" });
      })
      res
      .status(200)
      .json({Filter: myAudits})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }