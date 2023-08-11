const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const config = require('./app/config/db.config'); // import config file
const db = require("./app/models");
const app = express();
const cron = require('node-cron');
const envConfig = require("./app/config/env.config");
const Nodemailer = require('nodemailer');
app.use(cors());
app.use(express.json({limit: '500mb'}));

app.use('/departments', require('./app/routes/departments.routes')); // set up routes
app.use('/audit_observation', require('./app/routes/audit_observation'));
app.use('/countries', require('./app/routes/countries.routes'))
app.use('/AuditScheduleDepartments', require('./app/routes/audit_schedule_departments.routes'));
app.use('/AuditScheduleQuestionnaireAnswers', require('./app/routes/audit_schedule_questionnaire_answers.routes'))
app.use('/UsersLogin', require('./app/routes/usersLogin.routes'))
app.use('/UserRoles', require('./app/routes/userRoles.routes'))
app.use('/UserPassword', require('./app/routes/userPassword.routes'))
app.use('/sendOtp', require('./app/routes/sendOTP.routes'))
app.use('/ValidateOTP', require('./app/routes/validateOTP.routes'))
app.use('/UserResetPassword', require('./app/routes/userResetPassword.routes'))
app.use('/userUpdateProfile', require('./app/routes/userUpdateProfile.routes'))
app.use('/userUpdateProfileImage', require('./app/routes/userUpdateProfileImage.routes'))
app.use('/UserFingerPrint', require('./app/routes/userFingerPrint.routes'))
app.use('/UserNotification', require('./app/routes/userNotification.routes'))
app.use('/UserUpdateNotification', require('./app/routes/userUpdateNotification.routes'))
app.use('/Cinemas', require('./app/routes/cinemas.routes'))
app.use('/Regions', require('./app/routes/region.routes'))
app.use('/Question', require('./app/routes/questionnaires.routes'))
app.use('/CinemaAuditHome', require('./app/routes/cinemaAuditHome.routes'))
app.use('/CinemaDetails', require('./app/routes/cinemaDetails.routes'))
app.use('/AuditScheduleUser', require('./app/routes/auditScheduleUser.routes'))
app.use('/AuditScheduleUserPermission', require('./app/routes/auditScheduleUserPermission.routes'))
app.use('/QuestionnaireByDepartment', require('./app/routes/auditScheduleQuestionnaireByDepartment.routes'))
app.use('/AuditQuestionnaireComments', require('./app/routes/saveQuestionnaireComments.routes'))
app.use('/AuditQuestionnaireEditableObservations', require('./app/routes/audit_schedule_editable_comment.routes'))
app.use('/AuditQuestionnaireAttachments', require('./app/routes/saveQuestionnaireAttachments.routes'))
app.use('/Location', require('./app/routes/location.routes'))
app.use('/updateAuditStatus', require('./app/routes/auditUserStatus.routes'))
app.use('/AuditUpdateCurrentStatus', require('./app/routes/auditUpdateCurrentStatus.routes'))
app.use('/UpdateUserStatus', require('./app/routes/updateUserStatus.routes'))
app.use('/DeleteAttachment', require('./app/routes/deleteAttachmment.routes'))
app.use('/QuestionnaireAttachment', require('./app/routes/questionnaireAttachment.routes'))
app.use('/QuestionnaireComment', require('./app/routes/questionnaireComment.routes'))
app.use('/CinemaMasterData', require('./app/routes/cinemaMasterData.routes'))
app.use('/PerformanceReport', require('./app/routes/performanceReport.routes'))
app.use('/AuditStatusReport', require('./app/routes/auditStatusReport.routes'))
app.use('/DownloadQuestion', require('./app/routes/downloadQuestion.routes'))
app.use('/DownloadQuestionnairePDF', require('./app/routes/downloadQuestionnairePDF.routes'))
app.use('/Myaudits',require('./app/routes/my_audit.routes'))
app.use('/Notification',require('./app/routes/notification.routes'))


const port = process.env.PORT || 8698
db.sequelize.sync();
// start the server
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const sendEmail = async(obj, role) => {
  let email;
  let Auditor;
  let Pmo;
  if(role == "CAT"){
    let [catEmail, meta] =  await db.sequelize.query("SELECT email FROM `users` WHERE role_id = 8")
    if(catEmail){
      email = catEmail[0].email
    }
  }
  if(role == "TL"){
    email = ((obj.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_Email']).toString()
  }
  if(role == "Auditor"){
    email = ((obj.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_Email']).toString()
    
  }
  Auditor= (obj.AssignedTo).find(elem => elem.role_name == 'Auditor') ? ((obj.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_name']).toString() : ''
  Pmo = (obj.AssignedTo).find(elem => elem.role_name == 'Project Management Office') ? ((obj.AssignedTo).find(elem => elem.role_name == 'Project Management Office')['user_name']).toString(): ''
  let auditName = obj.auditName
  console.log(email, auditName, "sdmfsd")
  const transporter = Nodemailer.createTransport({
    // Configure the SMTP settings for your email provider
    // Example for Gmail:
    service: 'gmail',
    auth: {
      user: 'mailassitantprotiviti@gmail.com',
      pass: 'uezkmqeoxbqdcwif'
    }
  });

  let mailOptions = {}

  if(role == "TL"){
   mailOptions = {
      from: 'mailassitantprotiviti@gmail.com',
      to: email,
      subject: 'Reminder: Audit Starting Soon',
      html: `<p>Hello,</p>
      <p>Please be advised that the following audit is scheduled for fieldwork on ${obj.start_date}.</p>
    
      <table border='1' style='border-collapse:collapse;padding: 0px 10px;'>
        <tr>
          <td><strong>Name of Audit</strong></td>
          <td>${obj.auditName}</td>
        </tr>
        <tr>
          <td><strong>Cinema Name</strong></td>
          <td>${obj.Cinema_name}</td>
        </tr>
        <tr>
          <td><strong>Start Date</strong></td>
          <td>${obj.start_date}</td>
        </tr>
        <tr>
          <td><strong>End Date</strong></td>
          <td>${obj.end_date}</td>
        </tr>
        // <tr>
        //   <td><strong>Auditor(s)</strong></td>
        //   <td>${Auditor}</td>
        // </tr>
        // <tr>
        //   <td><strong>PMO</strong></td>
        //   <td>${Pmo}</td>
        // </tr>
      </table>
      <p>Please click on below link to login & proceed.
      <a href="${envConfig.APP_URL}">portal</a>
      .</p>
      <p>Regards,</p>
      <p><em>
        iProEdge Team
      </em></p>`,
    };
  }
  else{
    mailOptions = {
      from: 'flipkartdatanew@gmail.com',
      to: email,
      subject: 'Reminder: Audit Starting Soon',
      html: `<p>Hello,</p>
      <p>Please be advised that the following audit is scheduled for fieldwork on ${obj.start_date}.</p>
    
      <table border='1' style='border-collapse:collapse;padding: 0px 10px;'>
        <tr>
          <td><strong>Name of Audit</strong></td>
          <td>${obj.auditName}</td>
        </tr>
        <tr>
          <td><strong>Cinema Name</strong></td>
          <td>${obj.Cinema_name}</td>
        </tr>
        <tr>
          <td><strong>Start Date</strong></td>
          <td>${obj.start_date}</td>
        </tr>
        <tr>
          <td><strong>End Date</strong></td>
          <td>${obj.end_date}</td>
        </tr>
        <tr>
          <td><strong>Auditor(s)</strong></td>
          <td>${Auditor}</td>
        </tr>
        <tr>
          <td><strong>PMO</strong></td>
          <td>${Pmo}</td>
        </tr>
      </table>
      <p>Please click on below link to login & proceed.
      <a href="${envConfig.APP_URL}">portal</a>
      .</p>
      <p>Regards,</p>
      <p><em>
        iProEdge Team
      </em></p>`,
    };
  }
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


const isWithinNextTwoDays = (startDate) => {
  const twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);

  return startDate = twoDaysLater;
};

const isWithinNextoneDays = (startDate) => {
  const twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 1);

  return startDate = twoDaysLater;
};


// connect to the database and sync models

const task = async(req, res) => {
  
  let query = "SELECT `audit_schedules`.`id` as AuditId, DATE_FORMAT(`audit_schedules`.`start_date`, '%d-%m-%Y') as start_date, DATE_FORMAT(`audit_schedules`.`end_date`, '%d-%m-%Y') as end_date, `audit_schedules`.`auditName`,`audit_schedules`.`audit_status`, `users`.`username` as created_by, `cinemas`.`name` as Cinema_name,`cinemas`.`region_id` as regionId,  `cinemas`.`id` as cinema_id, `cinemas`.`address` as cinema_address, CONCAT_WS(' ', u2.`first_name`, u2.`last_name`) as CinemaManeger, `cinemas`.`cinema_manager_id` as cinemamId, u2.`email` as cinemamanEmail, u2.`mobile` as cinemamanmobile, CONCAT_WS(' ', u1.`first_name`, u1.`last_name`) as AssignedTo, `roles`.`name` as role_name, `roles`.`id` as role_Id, `audit_schedule_users`.`user_id` as user_Id, `u1`.`email` as useremail, `u1`.`mobile` as usermobile, `cinemas`.`company_code` FROM `audit_schedules`"
      + " JOIN `cinemas` ON `audit_schedules`.`cinema_id` = `cinemas`.`id`"
      + " JOIN `users` ON `audit_schedules`.`created_by` = `users`.`id`"
      + " JOIN `audit_schedule_users` ON `audit_schedule_users`.`audit_schedule_id` = `audit_schedules`.`id` "
      + " JOIN `users` u1 ON u1.id = `audit_schedule_users`.`user_id`"
      + " JOIN `users` u2 ON u2.id = `cinemas`.`cinema_manager_id`"
      + " JOIN `roles` ON `roles`.`id` = `audit_schedule_users`.`role_id`"
      + " WHERE 1=1"

    let resultArr = []
    const [data, meta1] = await db.sequelize.query(query + ' ORDER BY `audit_schedules`.`id` DESC', console.log)

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
    if (resultArr) {
      const today = new Date();
    
      resultArr.forEach((obj) => {
        let start_date = obj.start_date;
        if (isWithinNextTwoDays(new Date(start_date))) {
          console.log(obj, "sdhfvhsdf")
          sendEmail(obj, "TL")
          .catch((e) => {
            console.log(e, "erroerdara");
            return false
          });
          
        }
        if (isWithinNextoneDays(new Date(start_date)) && obj.audit_status == "Pending") {
          console.log(obj, "sdhfvhsdf")
          sendEmail(obj, "CAT")
          .catch((e) => {
            console.log(e, "erroerdara");
            return false;
          });
          
        }
      });
    }
};

const task2 = async() => {
  
  let query = "SELECT `audit_schedules`.`id` as AuditId, DATE_FORMAT(`audit_schedules`.`start_date`, '%d-%m-%Y') as start_date, DATE_FORMAT(`audit_schedules`.`end_date`, '%d-%m-%Y') as end_date, `audit_schedules`.`auditName`,`audit_schedules`.`audit_status`, `users`.`username` as created_by, `cinemas`.`name` as Cinema_name,`cinemas`.`region_id` as regionId,  `cinemas`.`id` as cinema_id, `cinemas`.`address` as cinema_address, CONCAT_WS(' ', u2.`first_name`, u2.`last_name`) as CinemaManeger, `cinemas`.`cinema_manager_id` as cinemamId, u2.`email` as cinemamanEmail, u2.`mobile` as cinemamanmobile, CONCAT_WS(' ', u1.`first_name`, u1.`last_name`) as AssignedTo, `roles`.`name` as role_name, `roles`.`id` as role_Id, `audit_schedule_users`.`user_id` as user_Id, `u1`.`email` as useremail, `u1`.`mobile` as usermobile, `cinemas`.`company_code` FROM `audit_schedules`"
      + " JOIN `cinemas` ON `audit_schedules`.`cinema_id` = `cinemas`.`id`"
      + " JOIN `users` ON `audit_schedules`.`created_by` = `users`.`id`"
      + " JOIN `audit_schedule_users` ON `audit_schedule_users`.`audit_schedule_id` = `audit_schedules`.`id` "
      + " JOIN `users` u1 ON u1.id = `audit_schedule_users`.`user_id`"
      + " JOIN `users` u2 ON u2.id = `cinemas`.`cinema_manager_id`"
      + " JOIN `roles` ON `roles`.`id` = `audit_schedule_users`.`role_id`"
      + " WHERE 1=1"

    let resultArr = []
    const [data, meta1] = await db.sequelize.query(query + ' ORDER BY `audit_schedules`.`id` DESC', console.log)

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
    if (resultArr) {
      const today = new Date();
    
      resultArr.forEach((obj) => {
        let start_date = obj.start_date;
        if (isWithinNextoneDays(new Date(start_date)) && obj.audit_status == "Scheduled") {
          sendEmail(obj, "Auditor")
          .catch((e) => {
            res.status(500).send({
              message: "Could not run query. Please Try again after sometime.",
            });
            console.log(e, "erroerdara");
          });
          
        }
      });
    }
};

cron.schedule('00 10 * * *', task);
cron.schedule('00 06 * * *', task2);


const io = socket(server,{cors:{origin:"*"}});

io.on('connection', (socket) => 
{ 
  console.log("user is connected")
  socket.on('question_update',(data)=>{
    console.log("question_update",data);
    socket.join(data);
  })
  socket.on('send_message',(data)=>{
    socket.to(data.room).emit('recived_message',data);

  });

  socket.on('disconnect', () => { console.log("user disconnect") });
});


