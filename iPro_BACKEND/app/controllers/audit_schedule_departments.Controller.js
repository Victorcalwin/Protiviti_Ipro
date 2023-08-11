const db = require("../models");
const audit_schedule_departments = db.audit_schedule_departments;
const Op = db.Sequelize.Op;

exports.GetAuditBasedDepartment = async (req, res, next) => {
  try {
    let auditId = req.body.auditId;
    let deptname = req.body.deptname;

    // console.log("askdfadfa", req.body)

    let query = 'SELECT DISTINCT d.name, d.id as deptId FROM `audit_schedule_departments` aud LEFT JOIN `departments` d on d.name = aud.name where d.name IS NOT null'

    if(auditId){
      query += " AND aud.audit_schedule_id = "+auditId
    }
    if(deptname){
      query = "SELECT DISTINCT d.name, d.id as deptId FROM `departments` d  where d.name IS NOT null AND d.id IN ('" + deptname.join("','") + "') "
    }
    // console.log(query, "dfsfsdfs")
    const [data, meta] = await db.sequelize.query(query)
    res.status(200)
    .send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}


exports.UpdateAuditStatus = async (req, res, next) => {
  try {
    let input = {
      auditId : req.body.auditId,
      status : req.body.status
    }
    // console.log(input,"inputttttttttt")

    let query = "UPDATE `audit_schedules` set `audit_schedules`.`audit_status` = '"+input.status+"' WHERE `audit_schedules`.`id` = '"+input.auditId+"'"
    const [data, meta] = await db.sequelize.query(query)
    res.status(200)
    .send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}