const db = require("../models");
const _ = require("lodash");
const auditStatus = db.audit_schedules;
const auditSchedulesuser = db.audit_schedule_users;
const auditSchedulesdept = db.audit_schedule_departments;
const Op = db.Sequelize.Op;
const Nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const PptxGenJS = require('pptxgenjs');
const envConfig = require("../config/env.config");
const { options } = require("../routes/auditStatusReport.routes");
const XLSX = require("xlsx");


const audit_schedule_quesAttachment = async (file, questionId, auditId, userId) => {
  let image_path = "C:/images";
  image_path = image_path + "/" + file.filename;
  let curtime = new Date();

  const query = "INSERT INTO `audit_schedule_questionnaire_attachments` (`user_id`, `audit_schedule_id`, `audit_schedule_questionnaire_id`, `FileName`, `FilePath`, `MimeType`, `created`) VALUES ('"+userId+"', '"+auditId+"', '"+questionId+"', '"+file.filename+"', '"+image_path+"', '"+file.mimetype+"', CURRENT_TIMESTAMP)";

  try {
    const [data, meta] = await db.sequelize.query(query);

    return data;
  } catch (error) {
    console.error(error);
  }
};




exports.postAuditStatus = async (req, res, next) => {
  try {
    let departmentsName = req.body.postdata.departmentsName;
    let departmentsManID = req.body.postdata.departmentsManID;
    // let auditorVal = req.body.postdata.auditorVal;
    const data = await auditStatus.create(req.body.postdata)

    // console.log("dfghjk", req.body.tlName, req.body.pmoName, typeof(req.body.departmentsManID))
    // return false;
    if (data) {
      await db.sequelize.query(
        "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + req.body.postdata.tlName + "', 5, 1)"
      )
      // await db.sequelize.query(
      //   "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + req.body.postdata.pmoName + "', 6, 0)"
      // )
      await db.sequelize.query(
        "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + req.body.postdata.directorID + "', 3, 0)"
      )
      await departmentsManID.map(async (item) => {
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + item + "', 4,0)"
        )
      })
      await departmentsName.map(async (item) => {
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_departments`(`audit_schedule_id`, `name`) VALUES ('" + data.id + "','" + item + "')"
        )
      })
      // await auditorVal.map(async (item) => {
      //   await db.sequelize.query(
      //     "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + item + "', 2,0)"
      //   )
      // })
      await db.sequelize.query(
        "INSERT INTO `audit_schedule_questionnaires` (`audit_schedule_id`, `audit_schedule_department_id`, `code`, `question_id`, `question`, `answer`, `score`, `audit_type`, `criticality`, `is_mandatory`, `Is_Attachment_Req`, `question_hint`) SELECT '" + data.id + "', q.department_id,q.code,q.id,q.question,NULL,q.score,q.audit_type,q.criticality,q.is_mandatory,q.Is_Attachment_Req,q.question_hint FROM `questionnaires` q JOIN `departments` d ON q.department_id = d.id WHERE d.name IN ('" + departmentsName.join("','") + "') "
      )

    }
    res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error });
  }
}

exports.updateAudit = async (req, res, next) => {
  try {
    let auditId = req.body.postdata.auditId
    let departmentsName = req.body.postdata.departmentsName;
    let departmentsManID = req.body.postdata.departmentsManID;
    let auditorVal = req.body.postdata.auditorVal;
    const [data, meta] = await db.sequelize.query(
      "UPDATE `audit_schedules` SET `cinema_id`=" + req.body.postdata.cinema_id + ",`start_date`='" + req.body.postdata.start_date + "',`end_date`='" + req.body.postdata.end_date + "',`auditName`='" + req.body.postdata.auditName + "',`scheduling_type`='" + req.body.postdata.scheduling_type + "',`audit_status`='" + req.body.postdata.audit_status + "',`created_by`=" + req.body.postdata.created_by + "  WHERE `id` = " + auditId + ""
    )


    // console.log("dfghjk", req.body.tlName, req.body.pmoName, typeof(req.body.departmentsManID))
    // return false;
    if (data) {
      await auditSchedulesuser.destroy({ where: { audit_schedule_id: auditId, } })
      await db.sequelize.query(
        "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + auditId + "','" + req.body.postdata.tlName + "', 5, 1)"
      )
      if(req.body.postdata.pmoName && req.body.postdata.pmoName != '' && req.body.postdata.pmoName!= null){
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + auditId + "','" + req.body.postdata.pmoName + "', 6, 0)"
        )
      }
      await db.sequelize.query(
        "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + auditId + "','" + req.body.postdata.directorID + "', 3, 0)"
      )
      if(auditorVal && auditorVal.length>0){
        await auditorVal.map(async (item) => {
          await db.sequelize.query(
            "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + auditId + "','" + item + "', 2,0)"
          )
        })
      }
      await departmentsManID.map(async (item) => {
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + auditId + "','" + item + "', 4,0)"
        )
      })
      await auditSchedulesdept.destroy({ where: { audit_schedule_id: auditId } })
      console.log(departmentsName, "sdmfbsdjvfjvds")
      await departmentsName.map(async (item) => {
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_departments`(`audit_schedule_id`, `name`) VALUES ('" + auditId + "','" + item + "')"
        )
      })

    }
    res.status(200).send({ message: 'success', data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getDataforCalender = async (req, ers, next) => {
  try {
    const data = "SELECT id FROM audit_schedules, audit_shedule_users WHERE "
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

exports.StatusAudit = async (req, res, next) => {
  try {
    let auditId = req.body.auditId ? req.body.auditId : 0
    let depatmentId = req.body.deptId ? req.body.deptId : 0
    let resultArr = {};
    let percentage = 0;
    let total = 0;
    let match = 0;
    let query = "SELECT `audit_schedules`.`id` as AuditId,`audit_schedule_questionnaires`.`answer`,`audit_schedule_questionnaires`.`audit_schedule_department_id`  FROM `audit_schedules` JOIN `audit_schedule_questionnaires` ON `audit_schedules`.`id` = `audit_schedule_questionnaires`.`audit_schedule_id`"
      + " WHERE 1=1"
    if (auditId != 0) {
      query += " AND `audit_schedules`.`id` = " + auditId
    }
    if (depatmentId != 0) {
      query += " AND `audit_schedule_questionnaires`.`audit_schedule_department_id` = " + depatmentId
    }
    const [data, meta1] = await db.sequelize.query(query);
    if (data.length > 0) {
      total = data.length;
      match = _.filter(data, dataValue => { return dataValue.answer !== ''; }).length;
      if (match > 0) {
        percentage = _.floor((match / total) * 100, [precision = 0]);
        resultArr = { ...resultArr, percentage, total, match }
        res.status(200).json(resultArr);
        return;
      }
      resultArr = { ...resultArr, percentage, total, match }
      res.status(200).json(resultArr);
      return;

    }
    resultArr = { ...resultArr, percentage, total, match }
    res.status(200).json(resultArr);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    return;
  }
}

exports.GetAllAudit = async (req, res, next) => {
  try {
    //console.log("req.body",req.body);
    // const data = await auditStatus.findAll()
    let roleId = req.body.role ? req.body.role : 0
    let userId = req.body.userId ? req.body.userId : 0
    let auditId = req.body.auditId ? req.body.auditId : 0
    // console.log(auditId, "kshdbcbsdf")
    let resultArr = []
    let query = "SELECT `audit_schedules`.`id` as AuditId, DATE_FORMAT(`audit_schedules`.`start_date`, '%d-%m-%Y') as start_date, DATE_FORMAT(`audit_schedules`.`end_date`, '%d-%m-%Y') as end_date, `audit_schedules`.`auditName`,`audit_schedules`.`audit_status`, `audit_schedules`.`File_Name`, `audit_schedules`.`File_Path`, `users`.`username` as created_by, `cinemas`.`name` as Cinema_name,`cinemas`.`region_id` as regionId,  `cinemas`.`id` as cinema_id, `cinemas`.`address` as cinema_address, CONCAT_WS(' ', u2.`first_name`, u2.`last_name`) as CinemaManeger, `cinemas`.`cinema_manager_id` as cinemamId, u2.`email` as cinemamanEmail, u2.`mobile` as cinemamanmobile, CONCAT_WS(' ', u1.`first_name`, u1.`last_name`) as AssignedTo, `roles`.`name` as role_name, `roles`.`id` as role_Id, `audit_schedule_users`.`user_id` as user_Id, `u1`.`email` as useremail, `u1`.`mobile` as usermobile, `cinemas`.`company_code` FROM `audit_schedules`"
      + " JOIN `cinemas` ON `audit_schedules`.`cinema_id` = `cinemas`.`id`"
      + " JOIN `users` ON `audit_schedules`.`created_by` = `users`.`id`"
      + " JOIN `audit_schedule_users` ON `audit_schedule_users`.`audit_schedule_id` = `audit_schedules`.`id` "
      + " JOIN `users` u1 ON u1.id = `audit_schedule_users`.`user_id`"
      + " JOIN `users` u2 ON u2.id = `cinemas`.`cinema_manager_id`"
      + " JOIN `roles` ON `roles`.`id` = `audit_schedule_users`.`role_id`"
      + " WHERE 1=1"
    if (auditId != 0) {
      query += " AND `audit_schedules`.`id` = " + auditId
    }
    if (userId != 0 && roleId != 1 && roleId != 7 && roleId != 8 && roleId != 9) {
      query += " AND `audit_schedules`.`id` in (SELECT DISTINCT audit_schedule_id FROM `audit_schedule_users` WHERE `user_id` =" + userId + ")"
    }
    if (roleId == 7) {
      query += " AND `audit_schedules`.`audit_status` in ('Pending', 'Sent to CM', 'Forwarded to CM') AND u2.id = " + userId
    }
    if (roleId == 9) {
      query += " AND `audit_schedules`.`audit_status` = 'Sent to QC' "
    }
    //  console.log("query",query);
    const [data, meta1] = await db.sequelize.query(query + ' ORDER BY `audit_schedules`.`id` DESC', console.log)
    // console.log(data, "sdbfvsbdfvnsdf")
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (resultArr.find(elem => elem.AuditId == data[i].AuditId)) {
          let assignedTo = resultArr.find(elem => elem.AuditId == data[i].AuditId)['AssignedTo'];
          let assignedToElem = assignedTo.find(elem => elem.role_name == data[i].role_name);

          if (assignedToElem) {
            let userNameArr = assignedToElem.user_name;
            let userIdArr = assignedToElem.UserId;
            let userEmailArr = assignedToElem.user_Email;
            let usermobileArr = assignedToElem.user_Mobile;

            if (Array.isArray(userNameArr) && Array.isArray(userIdArr) && Array.isArray(userEmailArr) && Array.isArray(usermobileArr)) {
              userNameArr.push(data[i].AssignedTo);
              userIdArr.push(data[i].user_Id);
              userEmailArr.push(data[i].useremail);
              usermobileArr.push(data[i].usermobile);
            }
          } else {
            let arr = [data[i].AssignedTo];
            let arrId = [data[i].user_Id];
            let arremail = [data[i].useremail];
            let arrmobile = [data[i].usermobile];

            assignedTo.push({
              "role_name": data[i].role_name,
              "user_name": arr,
              "UserId": arrId,
              "user_Email": arremail,
              "user_Mobile": arrmobile
            });
          }
        } else {
          resultArr.push({
            "AuditId": data[i].AuditId,
            "start_date": data[i].start_date,
            "end_date": data[i].end_date,
            "auditName": data[i].auditName,
            "audit_status": data[i].audit_status,
            "cinema_id": data[i].cinema_id,
            "regionId": data[i].regionId,
            "created_by": data[i].created_by,
            "Cinema_name": data[i].Cinema_name,
            "cinema_address": data[i].cinema_address,
            "company_code": data[i].company_code,
            "File_Name": data[i].File_Name,
            "File_Path": data[i].File_Path,
            "AssignedTo": [
              {
                "role_name": data[i].role_name,
                "user_name": [data[i].AssignedTo],
                "UserId": [data[i].user_Id],
                "user_Email": [data[i].useremail],
                "user_Mobile": [data[i].usermobile]
              },
              {
                "role_name": 'Cinema Manager',
                "user_name": data[i].CinemaManeger,
                'UserId': data[i].cinemamId,
                'user_Email': data[i].cinemamanEmail,
                'user_Mobile': data[i].cinemamanmobile
              }
            ]
          });
        }
      }
    }

    for (let i = 0; i < resultArr.length; i++) {
      if (resultArr[i].File_Name !== null && resultArr[i].File_Name !== '', resultArr[i].File_Path !== null && resultArr[i].File_Path !== '') {
        const PPTPath = path.join(resultArr[i].File_Path, resultArr[i].File_Name);

        const ppt = await new Promise((resolve, reject) => {
          fs.readFile(PPTPath, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });

        // const compressedppt = await sharp(ppt)
        //   .resize(800, 600)
        //   .pptx({ quality: 80 })
        //   .toBuffer();

        let ppturl = ppt.toString('base64');
        let contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        if (resultArr[i].File_Name.endsWith('.pptx')) {
          contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        }
        resultArr[i].File_Name = "data:" + contentType + ";base64, " + ppturl;
      }
    }
    res.set('Content-Type', 'application/json');

    res.status(200).json(resultArr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}
exports.updateAuditStatus = async (req, res, next) => {
  try {
    if(req.body && !Object.keys(req.body).includes('data')){
      req.body = {...req.body,"data":req.body ? req.body : {}}
    }

    let fileName ='';
    let filepath ='';
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    let dateTime = date + '' + time;
    let pptdata = req.body.data.pptdata
    let cinema = '';
    let startDate = '';
    let endDate = '';
    if(req.body.data.AuditDetail){
      cinema = req.body.data.AuditDetail.Cinema_name
      startDate = req.body.data.AuditDetail.start_date
      endDate = req.body.data.AuditDetail.end_date
    }

    let [observations, meta] = await db.sequelize.query("SELECT DISTINCT asq.*, dept.name AS deptname FROM `audit_schedule_questionnaires` AS asq JOIN departments AS dept ON dept.id = asq.audit_schedule_department_id JOIN audit_schedule_questionnaire_comments AS asqc ON asqc.audit_schedule_questionnaire_id = asq.id WHERE asq.`audit_schedule_id` = '"+req.body.data.auditId+"' AND LENGTH(asq.`more_details`) > 0 AND asq.`more_details` != 'undefined';")
    let [remediation, meta2] =await db.sequelize.query("SELECT * FROM `audit_observation_remediation` WHERE `audit_id` = '"+req.body.data.auditId+"'")
    // console.log(observations, "sdhfvhsd")

    if(pptdata){
      const pptx = new PptxGenJS();
      let slides =[]
      const slide = pptx.addSlide();
      slide.addImage({
        x: 0,
        y: 0,
        w: '100%',
        h: '100%',
        path: 'https://images.news18.com/ibnlive/uploads/2017/01/PVR.jpg?impolicy=website&width=510&height=356', // Replace with the actual path to the image
      });
      slide.addText(`${startDate} to ${endDate}`,{ x: 0, y: 2.4, w: "100%", h: 2, align: "center", fill: "F1F1F1", color: "0088CC", fontSize: 24,});
      slide.addText(`${req.body.data.AuditDetail.auditName}`,{ x: 0, y: 2, w: "100%", h: 2, align: "center", color: "0088CC", fontSize: 24,});
      slide.addText(`Audit Summary`,{ x: 0, y: 2.8, w: "100%", h: 2, align: "center", color: "0088CC", fontSize: 24, });
    

      const slide1 = pptx.addSlide();
      slide1.addText(`Audit Detailes`,{ x: 0.5, y: 0, w: "32%", h: '100%', align: "center", fill: "F1F1F1", color: "0088CC", fontSize: 24,});
      slide1.addText(`${req.body.data.AuditDetail.auditName}`,{ x: 5, y: 1, w: "50%", h: 2, align: "left", fontSize: 16,});
      slide1.addText(`From ${startDate} To ${endDate}`,{ x: 5, y: 1.4, w: "50%", h: 2, align: "left", fontSize: 16,});
      slide1.addText(`Cinema Manager- ${((req.body.data.AuditDetail.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_name']).toString()}`,{ x: 5, y: 1.8, w: "50%", h: 2, align: "left", fontSize: 16,});
      slide1.addText(`Cinema- ${cinema}`,{ x: 5, y: 2.2, w: "50%", h: 2, align: "left", fontSize: 16,});
      slide1.addText(`Address- ${req.body.data.AuditDetail.cinema_address}`,{ x: 5, y: 2.6, w: "50%", h: 2.5, align: "left", fontSize: 16,});
      slide1.addText('PVR Cinemas Ltd. – Executive Summary – Cinema Audits', {
        x: 0.05,
        y: 5.2,
        w: '100%',
        h: 0.5,
        align: 'center',
        fontSize: 12,
      });
    
      const slide2 = pptx.addSlide();
      slide2.addText(`Detailed Observation`,{ x: 0.5, y: 0, w: "32%", h: '100%', align: "center", fill: "F1F1F1", color: "0088CC", fontSize: 24,});
      slide2.addText('PVR Cinemas Ltd. – Executive Summary – Cinema Audits', {
        x: 0.05,
        y: 5.2,
        w: '100%',
        h: 0.5,
        align: 'center',
        fontSize: 12,
      });


      observations.map((item, index) => {
        const slide = pptx.addSlide();
        const slideWidth = slide.width;
        const centerX = slideWidth / 2;
        slide.addText(`${item.deptname}`, { x: 0.05, y: 0.05, w: '100%', h: 0.5, align: 'left', fontSize: 24, options: { bold: true} });
        slide.addText(`${item.criticality}`, { x: 0.05, y: 0.05, w: '100%', h: 0.5, align: 'right', color: (item.criticality == 'Super Critical') ? 'FF0000' : 'FFB900', fontSize: 16, });
        slide.addText(`${item.more_details.charAt(0).toUpperCase() + item.more_details.slice(1)}`, { x: 0.1, y: 0.5, w: '100%', h: 1, align: 'left' });
        // slide.addShape(pptx.shapes.LINE, { x:centerX , y:0, w:0, h:3, line:'FF0000', line_size:1});
        // const col2cellstyle = { cpo: [null, null, { color: 'DA70D6' }, null] };
        var arrBorder1 = [ {color:'FFFFFF'}, {color:'31B8DC'}, {color:'FFFFFF'}, {color:'FFFFFF'} ];
        var arrBorder2 = [ {color:'FFFFFF'}, {color:'FFFFFF'}, {color:'FFFFFF'}, {color:'31B8DC'} ];
        let table = [[
        {text: "Observation", options: { color: 'FFFFFF', align :'center', w: 2, h:1, fill: '31B8DC',border: arrBorder1 }}, 
        {text: "Remediation", options: { color: 'FFFFFF', align :'center', w: 2, h:1, fill: '31B8DC',border: arrBorder2  }}]];
        
        slide.addTable(table, { x: 0, y: 1.5, w: '100%', fontSize: 16,align: 'center' });

        if(item.FILE_NAME && item.FILE_NAME != ''&& item.FILE_NAME != null && item.FILE_NAME!= 'undefined' ){
          slide.addImage({
            path: item.FILE_PATH, // Replace with the actual path to your image file
            x: 0.5,                    // X position of the image
            y: 2,                    // Y position of the image
            w: '40%',                      // Width of the image
            h: '40%',                  // Height of the image
          });
        }

        let quesremediation = remediation.filter((obj) => obj.Audit_question_id == item.id)

        console.log(quesremediation, "sdkfbhksdbfkdsh")

        if(quesremediation && quesremediation[0] && quesremediation[0].file_name && quesremediation[0].file_name != ''&& quesremediation[0].file_name != null && quesremediation[0].file_name!= 'undefined' ){
          console.log('sjkdbfkjsdbkjdfbskdjksjf')
          slide.addImage({
            path: quesremediation[0].file_path, // Replace with the actual path to your image file
            x: '55%',                    // X position of the image
            y: 2,                    // Y position of the image
            w: '40%',                      // Width of the image
            h: '40%',                  // Height of the image
          });
        }

        slide.addText('PVR Cinemas Ltd. – Executive Summary – Cinema Audits', {
          x: 0.05,
          y: 5.2,
          w: '100%',
          h: 0.5,
          align: 'center',
          fontSize: 12,
        });

      });
      filepath = `C:/iproppt/Audit${req.body.data.auditId}/`;
      fileName ='';

      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
         fileName = `iProEdgePPT${date}.pptx`
      pptx.writeFile({ fileName: filepath+ fileName });
        console.log('Folder created successfully.');
      } else {
         fileName = `iProEdgePPT${date}.pptx`
      pptx.writeFile({ fileName: filepath+ fileName });
        console.log('Folder already exists.');
      }
      
    }
    let data;

    if (pptdata) {
      data = await db.sequelize.query("UPDATE `audit_schedules` SET `audit_status`='"+req.body.data.status+"', `File_Name`='"+fileName+"', `File_Path`='"+filepath+"', `Mime_Type`='.pptx' WHERE `id`='"+req.body.data.auditId+"'")
    }
    else if(req.body.data.Remark){
      data = await db.sequelize.query("UPDATE `audit_schedules` SET `audit_status`='"+req.body.data.status+"', `Remark` ='"+req.body.data.Remark+"' WHERE `id`='"+req.body.data.auditId+"'")
    }
    else{
      data = await db.sequelize.query("UPDATE `audit_schedules` SET `audit_status`='"+req.body.data.status+"' WHERE `id`='"+req.body.data.auditId+"'")
    }

    console.log(data, "sdjfnjsdfnj")

      res.status(200).json(data);
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

exports.submitAuditAnswer = async (req, res, next) => {

  try {
    if(req.body && !Object.keys(req.body).includes('data')){
      req.body = {...req.body,"data":req.body ? req.body : {}}
    }
    let auditId = req.body.data.auditId
    let questionId = req.body.data.questionId
    let moreDetail = req.body.data.moreDetail
    let answers = req.body.data.answers;
    let userId = req.body.data.userId;

    let query = ""

    // console.log(req, "sdkfbksdbfjksdb")

    if (req.file) {
      let image_path = "C:/images"
      image_path = image_path + "/" + req.file.filename
      query = "UPDATE `audit_schedule_questionnaires` SET `answer`='" + answers + "',`FILE_NAME`='" + req.file.filename + "',`FILE_PATH`='" + image_path + "',`MIME_TYPE`='" + req.file.mimetype + "'"
      audit_schedule_quesAttachment(req.file, questionId, auditId, userId)
    } else {
       query = "UPDATE `audit_schedule_questionnaires` SET `answer`='" + answers + "'"
    }
    if (moreDetail && moreDetail != '' && moreDetail != null && moreDetail != undefined && moreDetail != 'undefined'){
      query += ", `more_details`='" + moreDetail + "'"
    }
    query += " WHERE `audit_schedule_id` = '" + auditId + "' AND `question_id` = '" + questionId + "'";

    // console.log(query, moreDetail, "sdhdbfsbf")

    const [data, meta] = await db.sequelize.query(query)
    // console.log(data, "sdkfbksdbfjksdb")
    res.status(200).send(message = 'success');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.submitEditAuditAnswer = async (req, res, next) => {
  try {
    const audit_id = req.body.auditId
    const data = req.body.queData

    // console.log(data,"aldfoasdj")

    data.map(async (item) => {
      const [data1, meta1] = await db.sequelize.query("UPDATE `audit_schedule_questionnaires` SET `answer`='" + item.answer + "' WHERE `audit_schedule_id` = '" + audit_id + "'AND `question_id` = '" + item.question_id + "'")

    })

    res.status(200).send(message = 'success');

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.submitStausofLow = async (req, res, next) => {
  try {
    const audit_id = req.body.auditId
    const queId = req.body.quesId

    const [data1, meta1] = await db.sequelize.query("UPDATE `audit_schedule_questionnaires` SET `escalations_status`='" + req.body.status + "' WHERE `audit_schedule_id` = '" + audit_id + "'AND `id` = '" + queId + "'")

    res.status(200).send(message = 'success');

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.submitStausofObservation = async (req, res, next) => {
  // console.log(req.body, "jddjddu")
  try {
    const audit_id = req.body.auditId
    const queId = req.body.quesId

    const [data1, meta1] = await db.sequelize.query("UPDATE `audit_schedule_questionnaires` SET `cm_observations`='" + req.body.status + "' WHERE `audit_schedule_id` = '" + audit_id + "'AND `id` = '" + queId + "'")

    res.status(200).send(message = 'success');

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.changequesImage = async (req, res, next) => {
  try {
    let auditId = req.body.data.auditId
    let questionId = req.body.data.questionId
    let userId = req.body.data.userId
    let image_path = "C:/images"
    image_path = image_path + "/" + req.file.filename
    // console.log(image_path, "sdfsdfsdf")
    let query = "UPDATE `audit_schedule_questionnaires` SET `FILE_NAME`='" + req.file.filename + "',`FILE_PATH`='" + image_path + "',`MIME_TYPE`='" + req.file.mimetype + "' WHERE `audit_schedule_id` = '" + auditId + "' AND `id` = '" + questionId + "'"
    // console.log(query, "dfwefwef")
    const [question,meta]=await db.sequelize
    .query(query)
    const data = audit_schedule_quesAttachment(req.file, questionId, auditId, userId)
    res.status(200).json({message:'successfully Uploaded'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.changequesremediationImage = async (req, res, next) => {
  try {
    let auditId = req.body.data.auditId
    let questionId = req.body.data.questionId
    let userId = req.body.data.userId
    let deptId = req.body.data.deptId
    let image_path = "C:/images"
    image_path = image_path + "/" + req.file.filename

    // console.log(auditId, questionId)

    let [remediationdata, meta2] = await db.sequelize.query("SELECT * FROM `audit_observation_remediation` WHERE `audit_id` = '" + auditId + "' AND `Audit_question_id` = '" + questionId + "'")
    console.log(remediationdata, "sdfsdfsdf")
    let query = '';
    if(remediationdata.length != 0  && remediationdata.file_path != null && remediationdata.file_path != ''){
      query = "UPDATE `audit_observation_remediation` SET `file_name`='" + req.file.filename + "',`file_path`='" + image_path + "',`mime_type`='" + req.file.mimetype + "'  WHERE `audit_id` = '" + auditId + "' AND `Audit_question_id` = '" + questionId + "'"
    }
    else{
      query = "INSERT INTO `audit_observation_remediation`(`audit_id`, `dept_id`, `Audit_question_id`, `file_name`, `file_path`, `mime_type`) VALUES ('" + auditId + "','" + deptId + "','" + questionId + "','" + req.file.filename + "','" + image_path + "','" + req.file.mimetype + "')"
    }
    console.log(query, "dfwefwef")
    const [question,meta]=await db.sequelize
    .query(query)
    const data = audit_schedule_quesAttachment(req.file, questionId, auditId, userId)
    res.status(200).json({message:'successfully Uploaded'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getRemediationImages = async (req, res, next) => {
  try {
    let auditId = req.body.auditId;

    let [questions, meta2] = await db.sequelize.query("SELECT * FROM `audit_observation_remediation` WHERE `audit_id` = '" + auditId + "'")
    

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].file_path !== null && questions[i].file_path !== '') {
        const file_path = path.join(questions[i].file_path);

        const image = await new Promise((resolve, reject) => {
          fs.readFile(file_path, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });

        const compressedImage = await sharp(image)
          .resize(800, 600)
          .jpeg({ quality: 80 })
          .toBuffer();

        let imageurl = compressedImage.toString('base64');
        let contentType = 'image/jpg';
        if (questions[i].file_path.endsWith('.PNG')) {
          contentType = 'image/png';
        }
        questions[i].file_path = "data:" + contentType + ";base64, " + imageurl;
      }
    }
    res.set('Content-Type', 'application/json');

    res.status(200).send(questions)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
}

const fileUploadAction = (req, res, next, auditId) => {
  return new Promise(async function (resolve, reject) {
      var allUploadFiles = [];
      let fileDetail = {};
      var storage = multer.diskStorage({
        destination: `C:/iproppt/Audit${auditId}`,
        filename: function (req, file, cb) {
          var fileDetail = {
            mimeType: "",
            filename: "",
            newFileName: ""
          };
              var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              let filename = `iProEdgePPT${date}.pptx`

              fileDetail.mimeType = file.mimetype;
              fileDetail.filename = filename; //Display File Name
              fileDetail.filePath = `C:/iproppt/Audit${auditId}`; // File Path 

              if (filename != "") {
                  allUploadFiles.push(fileDetail);
              }

              cb(null, filename);
          }
      })
      let upload = multer({storage: storage}).single('ppt')
      upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              reject(err);
          }
          else if (err) {
              reject(err);
          } else {
              resolve(allUploadFiles);
          }
      });
  });
}

exports.UpdateReport = async (req, res, next) => {
  try {
    let auditId = req.params.id;
    let fileResponse = await fileUploadAction(req, res, next, auditId);
    if(fileResponse.length>0 && fileResponse[0].fileName != '' && fileResponse[0].fileName != null){
      console.log(fileResponse[0].fileName, "dflvnkfjdbkj") 
      let [questions, meta2] = await db.sequelize.query("UPDATE `audit_schedules` SET `File_Name`='"+fileResponse[0].fileName+"', `File_Path`='"+fileResponse[0].filepath+"' WHERE `id`='"+auditId+"'")
      res.status(200).send(questions)
    }
    else{
      res.status(500).send({message: 'File not uploaded'})
    }
    

    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
}

exports.deleteAudit = async (req, res, next) => {
  try {
    let auditId = req.body.auditId

    let auditquery = "DELETE FROM `audit_schedules` WHERE `id` = '"+auditId+"'"
    let deptquery =  "DELETE FROM `audit_schedule_departments` WHERE `audit_schedule_id` = '"+auditId+"'"
    let quesquery = "DELETE FROM `audit_schedule_questionnaires` WHERE `audit_schedule_id` = '"+auditId+"'"
    let userquery = "DELETE FROM `audit_schedule_users` WHERE `audit_schedule_id` = '"+auditId+"'"

    let [audit, meta] = await db.sequelize.query(auditquery)
    let [depts, meta1] = await db.sequelize.query(deptquery)
    let [questions, meta2] = await db.sequelize.query(quesquery)
    let [users, meta3] = await db.sequelize.query(userquery)
    
    res.status(200).send({ message: 'successfully Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.excelBulkUpload = async (req, res, next) => {
  try {
    const excel_path = req.file.destination + "/" + req.file.filename;
  var workbook = XLSX.readFile(excel_path);
var sheet_name_list = workbook.SheetNames;
var sheet = workbook.Sheets[sheet_name_list[0]];
var xlData = XLSX.utils.sheet_to_json(sheet, { raw: false });

for (var cellAddress in sheet) {
  if (!sheet.hasOwnProperty(cellAddress)) continue;

  var cell = sheet[cellAddress];
  if (cell.t === 'n' && XLSX.SSF.is_date(cell.v)) {
    var dateValue = new Date(XLSX.SSF.parse_date_code(cell.v));
    console.log('Cell ' + cellAddress + ' has a date value: ' + dateValue);
  }
}
  
  xlData = xlData.map((item) => {
    if (item.start_date instanceof Date) {
      item.start_date = item.start_date.toLocaleDateString(); 
    }
    return item;
  });

  let [cinemas, meta] = await db.sequelize.query("SELECT * FROM cinemas")
  let [departments, meta2] = await db.sequelize.query("SELECT * FROM departments")
  let [regions, meta3] = await db.sequelize.query("SELECT * FROM regions")
  
  xlData.forEach((item) => {
    const cinema = cinemas.find((cinema) => cinema.name === item.cinemaName);
    if (cinema) {
      item.cinema_id = cinema.id;
    }
  });
  xlData.forEach((item)=>{
    const region_id = regions.find((region) => region.name === item.region)
    if(region_id){
      item.region_id = region_id.id;
    }
  })
  xlData.forEach((item)=>{
    const directorID = regions.find((region)=>region.name === item.region)
    if(directorID){
      item.directorID = directorID.Regional_Director
    }
  })
  xlData.forEach((item) => {
    const departmentNames = item.departmentsName.split(',').map(name => name.trim());
    const deptIds = departments
      .filter((department) => departmentNames.includes(department.name))
      .map((department) => department.id);
    item.deptIds = deptIds;
    
  });
  
  // console.log(cinemas,"Xldata")
  function checkCinemaExists(cinemaName, cinemas) {
    for (const cinema of cinemas) {
      if (cinema.name === cinemaName) {
        return true; 
      }
    }
    return false;
  }
  
  const currentDate = new Date();
  
  const filteredData = xlData.filter((data) => {
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
  
    const cinemaExists = checkCinemaExists(data.cinemaName, cinemas);
    console.log(cinemaExists,"alskjdflskd")
    if (!cinemaExists) {
      console.log(`Cinema with name '${data.cinemaName}' not found in cinemas array.`);
      return false;
    }
  
    return cinemas.some(
      (cinema) =>
        cinema.region_id === data.region_id &&
        startDate > currentDate &&
        endDate >= startDate
    );
  });
  
  // console.log(filteredData, "jdfsldjflks");

  filteredData.forEach(function(obj) {
  var startDateParts = obj.start_date.split('/');
  var endDateParts = obj.end_date.split('/');
  obj.start_date = startDateParts.join('-');
  obj.end_date = endDateParts.join('-');
});
const updatedData = filteredData.map(obj => ({
  ...obj,
  audit_status: 'Draft',
  created_by: '5'
}));  

// console.log(filteredData,"asfkasdhfksahj")
// // console.log(cinemas, "cinemassssssssss")

console.log(filteredData.length, xlData.length,"kadfljsdlfjs")
  
 if(updatedData.length === xlData.length){
  updatedData.map(async(item)=>{
    const departmentIds = item.deptIds
    const cinemaId = item.cinema_id
    const departName = item.departmentsName.split(",")
     let newQuerty = await db.sequelize.query("SELECT department_Manager FROM cinemas_departments WHERE cinema_id = '"+cinemaId+"' AND department_id IN ('"+departmentIds+"');")
     const departmentManagers = [];

for (const innerArray of newQuerty) {
  for (const obj of innerArray) {
    departmentManagers.push(obj.department_Manager);
  }
}

    
    const data = await auditStatus.create(item);
    
      if (data) {
       
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + req.body.tlName + "', 5, 1)"
        )
        // await db.sequelize.query(
        //   "INSERT INTO `audit_schedule_users`(`audit_schedule_id`,  `role_id`, `is_team_lead`) VALUES ('" + data.id + "', 6, 0)"
        // )
        await db.sequelize.query(
          "INSERT INTO `audit_schedule_users`(`audit_schedule_id`, `user_id`, `role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + item.directorID + "', 3, 0)"
        )
        await departmentManagers.map(async (item) => {
          await db.sequelize.query(
            "INSERT INTO `audit_schedule_users`(`audit_schedule_id`,`user_id`,`role_id`, `is_team_lead`) VALUES ('" + data.id + "','" + item + "', 4,0)"
          )
        })
        await departName.map(async (item) => {
          await db.sequelize.query(
            "INSERT INTO `audit_schedule_departments`(`audit_schedule_id`, `name`) VALUES ('" + data.id + "','" + (item).trim() + "')"
          )
          await db.sequelize.query(
          "INSERT INTO `audit_schedule_questionnaires` (`audit_schedule_id`, `audit_schedule_department_id`, `code`, `question_id`, `question`, `answer`, `score`, `audit_type`, `criticality`, `is_mandatory`, `Is_Attachment_Req`, `question_hint`) SELECT '" + data.id + "', q.department_id,q.code,q.id,q.question,NULL,q.score,q.audit_type,q.criticality,q.is_mandatory,q.Is_Attachment_Req,q.question_hint FROM `questionnaires` q JOIN `departments` d ON q.department_id = d.id WHERE d.name IN ('" + (item).trim()+ "') "
        )
        })
      }
    })
    return res.status(200).json({ message: "Success" });
 }else{
  console.log("Given excel data is Cinema Name or Region is mismatch")
  return res.status(200).json({ message: "Given excel data is Cinema Name or Region mismatch" });
 }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while processing the upload" });
  }
  
};



