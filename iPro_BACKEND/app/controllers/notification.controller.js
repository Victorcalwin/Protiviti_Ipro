const Notification = require("../middleware/notification");
const envConfig = require("../config/env.config");
const db = require("../models");
const myAudits = db.audit_schedules;
const Op = db.Sequelize.Op;

Date.prototype.toShortFormat = function () {
  const monthNames = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec"];
  const day = this.getDate();
  const monthIndex = this.getMonth();
  const monthName = monthNames[monthIndex];
  const year = this.getFullYear();
  return `${day}-${monthName}-${year}`;
}

exports.updateNotification = async (req, res, next) => {
  try {
    let id = req.params.id
    console.log(id, 'audit id');
    const [myAudits, meta] = await db.sequelize
      .query("UPDATE `audit_schedules` SET `notification_status`='READ' WHERE id='" + id + "'")
    res.status(200).json({ message: "Notification Readed" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.pushNotificationForNonComplianceAnswer = async (req, res, next) => {
  try {
    let input = {
      auditId: req.body.auditId,
      departmentId: req.body.departmentId,
      questionId: req.body.questionId,
      answer: req.body.answer,
      senderId: req.body.senderId,
    }
    const today = new Date()
    const [auditDetails, meta1] = await db.sequelize.query("SELECT a.auditName,DATE_FORMAT(a.start_date,'%d-%b-%Y') as start_date, DATE_FORMAT(a.end_date,'%d-%b-%Y') as end_date, c.name as CinemaName, c.address, c.company_code, d.name as deptartmentName, aqs.criticality, u.id as userId,u.username, u.email, aqs.more_details as observation, aqs.FILE_NAME as fileName, aqs.FILE_PATH as filePath FROM `audit_schedules` a JOIN `audit_schedule_users` au ON a.id = au.audit_schedule_id AND au.role_id = 5 JOIN `users` u ON u.id = au.user_id JOIN `cinemas` c ON c.id = a.cinema_id JOIN `states` s ON s.id = c.state_id LEFT JOIN `cities` ci ON ci.id = c.city_id JOIN `audit_schedule_questionnaires` aqs ON a.id = aqs.audit_schedule_id JOIN `departments` d ON aqs.audit_schedule_department_id = d.id WHERE a.id = " + input.auditId + " AND aqs.question_id = " + input.questionId + ";")

    let message = "<p>Hi Sir,</p><p>In our Audit visit at " + auditDetails[0].CinemaName + " " + auditDetails[0].address + " dated " + today.toShortFormat() + ", team noted " + auditDetails[0].criticality + " related to " + auditDetails[0].deptartmentName + ", " + auditDetails[0].observation + "</p><p>Kindly find the attached declaration along with picture for your reference.</p><p><b>Regards,</b><br/>iProEDGE Team<br/>This is a system generated email. Please do not reply to this message.</p>"
    let mailBody = "<div style={{fontFamily: 'Arial',fontSize: '14px',fontStyle: 'normal',fontWeight: 'normal',textDecoration: 'none',textTransform: 'none',color: '#000000',backgroundColor: '#ffffff'}}>" + message + "</div>"
    let subject = auditDetails[0].criticality+" "+auditDetails[0].deptartmentName+" : "+auditDetails[0].CinemaName + " " + auditDetails[0].address+" dated "+ auditDetails[0].start_date +" to "+auditDetails[0].end_date
    let query = "INSERT INTO `user_notifications` (`type`, `sender_id`,`audit_Id`, `questionId`,`deptId`, `receiver_id`, `message`, `read_status`, `status`, `created`) VALUES ('Critical', " + input.senderId + ", " + input.auditId + ", " + input.questionId + ", " + input.departmentId + ", " + auditDetails[0].userId + ", '" + message + "', 'unread', 'New', CURRENT_DATE)"
    var toEmail = auditDetails[0].email
    var cc = ''
    const [data, meta] = await db.sequelize.query(query)
    await Notification.sendNotification(mailBody, toEmail, subject, 'high', cc, auditDetails[0].fileName, auditDetails[0].filePath)
    return res.status(200).send({ message, mailBody, auditDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}


