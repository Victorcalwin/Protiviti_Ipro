const db = require("../models");
const questionnaireObservations = db.audit_schedule_questionnaire_editobservations;
const Op = db.Sequelize.Op;
exports.postQuestionnairEditObservation = async (req, res) => {
 
  try {
    const [questionnaireObservations, meta]=await db.sequelize
    .query("INSERT INTO `audit_schedule_questionnaire_editobservations`(`user_id`, `Role_Id`, `audit_schedule_id`, `department_Id`, `audit_schedule_questionnaire_id`, `observations`) VALUES('"+req.body.Editdata.user_id+"', '"+req.body.Editdata.Role_Id+"', '"+req.body.Editdata.audit_schedule_id+"','"+req.body.Editdata.department_Id+"','"+req.body.Editdata.audit_schedule_questionnaire_id+"','"+req.body.Editdata.observations+"')")
    console.log(questionnaireObservations,"kjhgfdfghjkl")
    res.status(200).json(questionnaireObservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getQuestionnairEditObservation = async (req, res) => {
  try {

    let auditid = req.body.auditid
    let deptId = req.body.deptId

    const [questionnaireObservations, meta]=await db.sequelize
    .query("SELECT * FROM `audit_schedule_questionnaire_editobservations` WHERE department_Id = '"+deptId+"' And audit_schedule_id = '"+auditid+"';")
    console.log(questionnaireObservations,"kjhgfdfghjkl")
    res.status(200).json(questionnaireObservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
