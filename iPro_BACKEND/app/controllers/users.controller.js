const db = require("../models");
const keyConfig = require('../config/key');
const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = db.users;
const SEC = 'JDH87SFKJC86E9ND2IJI';
const bcrypt = require('bcrypt');
const Nodemailer = require('nodemailer');
const Notification = require("../middleware/notification");
const fs = require('fs');
const sharp = require('sharp');
const _ = require("lodash");
const XLSX = require("xlsx");

exports.postUserLogin = async (req, res, next) => {
  try {
    const data = await User.create({
      email: "L.narendra@protivitiglobal.in",
      password: "987654321",
      role_id: 1,
      first_name: 'lingam',
      last_name: 'Narendra',
      mobile: 9836232487,

    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.GetAllUser = async (req, res, next) => {
  try {
    const [data, meta] = await db.sequelize.query("SELECT u.*, r.name FROM `users` u Left Join `roles` r on r.id = u.role_id ORDER BY u.id DESC;")
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.CreateUser = async (req, res, next) => {
  try {
    let result = req.body.newUser;
    let username = result.firstname + result.lastname
    console.log(result.mobile, "asdfasdkfaskfjakds")
    const [data, meta] = await db.sequelize.query("INSERT INTO `users` (username, role_id, first_name, last_name, email, mobile, password) VALUES ('" + username + "','" + result.designation + "', '" + result.firstname + "', '" + result.lastname + "', '" + result.email + "', '" + result.mobile + "', '1234')")
    // console.log(req.body,"aksjdfhalsdf")
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    console.log(req.body, "dhvfhdsvfsdfvdsnbsds")
    const data = await User.update(
      {
        username: (req.body.firstname + req.body.lastname),
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        role_id: req.body.designation,
      },
      { where: { id: req.body.id } }
    )
    // let result = req.body.newUser;
    // let username = result.firstname + result.lastname
    // console.log(result.mobile, "asdfasdkfaskfjakds")
    // const [data, meta] = await db.sequelize.query("INSERT INTO `users` (username, role_id, first_name, last_name, email, mobile) VALUES ('" + username + "','" + result.designation + "', '" + result.firstname + "', '" + result.lastname + "', '" + result.email + "', '" + result.mobile + "')")
    // // console.log(req.body,"aksjdfhalsdf")
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.GetRole = async (req, res, next) => {
  try {
    const [data, meta] = await db.sequelize.query("SELECT * FROM roles")
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
exports.GetUser = async (req, res, next) => {
  try {
    const data = await User.findAll({
      where: {
        id: req.body.userId
      }
    })
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.userLogin = async (req, res, next) => {
  try {
    const { body } = req;
    loginSchema = Joi.object().keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().required(),
      mobile: Joi.string()
    }).xor('username', 'mobile', '	email');
    const result = loginSchema.validate(body);
    const { error } = result;
    if (!error) {
      let query = "select id,role_id,first_name,last_name from users where password='" + body.password + "'";
      if (body.username) {
        query += " and username='" + body.username + "'";
      }
      if (body.email) {
        query += " and email='" + body.email + "'";
      }
      if (body.mobile) {
        query += " and mobile='" + body.mobile + "'";
      }
      const [data, meta1] = await db.sequelize.query(query);
      if (data[0]?.id) {
        const userData = data[0];
        Jwt.sign({
          userData
        }, keyConfig.JwtKey, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            res.send({ message: 'Something went wrong.Please try some time later' });
          }
          res.send({ userData, token });
        });
      }
      else {
        res.send({ message: 'Email and password Not Found' });
      }
    }
    else {
      res.status(422).json({
        message: 'Invalid request',
        data: body,
        error: error?.details,
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}



//User login using Email;
exports.UserEmailLogin = async (req, res) => {
  console.log(req.body, 'email api')
  try {
    let OTP = Math.floor(1000 + Math.random() * 9000)
    let UserEmail = req.body.email
    let Token = Jwt.sign({ email: UserEmail }, SEC, { expiresIn: '5m' });
    const data = await User.findAll({
      where: {
        email: UserEmail,
        role_id: "2" 
      }
    })
    if (data.length === 0) {
      res.status(404).json({ message: "User not found or Contact to Admin" })
    } else {
      let result = data[0].dataValues
      SendOTP(result, OTP, Token, res)
      console.log(OTP);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Issue or Something Went Wrong' })
  }
}


//send the OTP to user
const SendOTP = async (result, OTP, Token, res) => {
  console.log(result, "kdkddk")
  try {
    let Fullname = result.first_name + " " + result.last_name;
    let UserId = result.id;
    let data = OTP.toString()
    let UserEmail = result.email
    let OTPSalt = await bcrypt.genSalt(10);
    let OTPHash = await bcrypt.hash(data, OTPSalt);

    console.log(OTP)

    const [out, meta] = await db.sequelize.query("SELECT * FROM `user_otps` WHERE user_id='" + UserId + "'")
    if (out.length === 0) {
      await db.sequelize.query("INSERT INTO `user_otps`(user_id, otp, token) VALUES ('" + UserId + "', '" + OTPHash + "', '" + Token + "')")
    } else {
      await db.sequelize.query("UPDATE `user_otps` SET user_id = '" + UserId + "', otp = '" + OTPHash + "', token =  '" + Token + "' WHERE user_id ='" + UserId + "'")
    }
    if (UserId) {
      //  Send a link Via mail;
      var transporter = Nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'victorcalwin@gmail.com',
          pass: 'wprfpbohkpghfcgd'
        }
      });

      var mailOptions = {
        from: "victorcalwin@gmail.com",
        to: UserEmail,
        subject: 'OTP Verification',
        html: `Your OTP is <b>${OTP}</b>.<br/>This OTP validity is 5 Minutes`,

      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent:' + info.response);
        }
      });

      res.status(200).json({ message: "OTP Sended to User Email", token: Token, email: UserEmail, id: UserId, user: Fullname })
    }
    else {
      res.status(404).json({ message: 'Please Contact to Admin' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong in OTP generation or Contact Admin' })
  }
}


//user entered OTP validation;
exports.otpValidation = async (req, res) => {
  try {
    let otp = req.body.otp.join('').toString()
    let Token = req.body.token.slice(1, -1);
    // let Email = req.body.email
    let user = req.body.id

    const [out, meta] = await db.sequelize.query("SELECT * FROM `user_otps` WHERE user_id='" + user + "'");
    if (out.length === 0) {
      return res.json({ message: 'Contact admin' });
    } else {
      Jwt.verify(Token, SEC, async (err, login) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
          }
        }
        let Verify = await bcrypt.compare(otp, out[0].otp);
        if (Verify === true) {
          return res.status(200).json({ message: 'Successfully Login' });
        } else {
          return res.status(401).json({ message: 'Unauthorized or wrong OTP' });
        }
      });
    }


  } catch (error) {
    res.status(500).json({ message: 'Server Issue or Something Went Wrong' })
  }
}

exports.DeleteUser = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [Cinemas, meta] = await db.sequelize
      .query('DELETE FROM `users` WHERE id="' + Id + '"')
    res.status(200).json({ message: 'successfully deleted' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.getRequiredActions = async (req, res, next) => {
  try {
    let input = {
      userId: req.body.userId ? req.body.userId : 0,
    }
    const [resultData, meta] = await db.sequelize
      .query("SELECT u1.id as NotificationId, u1.audit_Id, u1.questionId, u1.deptId, u1.message, u1.read_status, u1.status, DATE_FORMAT(u1.created,'%d-%m-%Y') as createdOn, a.auditName, DATE_FORMAT(a.start_date,'%d-%b-%Y') as start_date, DATE_FORMAT(a.end_date,'%d-%b-%Y') as end_date, aqs.question,aqs.answer, u.username as AuditorName, c.company_code, c.name as CinemaName, q.criticality as QuestionType, d.name as DeptName, aqs.FILE_NAME as fileName, aqs.FILE_PATH as filePath, aqs.more_details as Observation FROM `user_notifications` u1 JOIN `audit_schedules` a ON a.id = u1.audit_Id JOIN `audit_schedule_questionnaires` aqs ON u1.audit_Id = aqs.audit_schedule_id AND aqs.audit_schedule_department_id = u1.deptId AND aqs.question_id = u1.questionId JOIN `users` u ON u.id = u1.sender_id JOIN `cinemas` c ON c.id = a.cinema_id JOIN `questionnaires` q ON q.id = u1.questionId JOIN `departments` d ON d.id = u1.deptId WHERE u1.receiver_id = " + input.userId + " ORDER BY u1.id DESC;")

    const [criticalCount, meta1] = await db.sequelize
      .query("SELECT COUNT(u1.id) as CCount FROM `user_notifications` u1 JOIN `audit_schedules` a ON a.id = u1.audit_Id JOIN `audit_schedule_questionnaires` aqs ON u1.audit_Id = aqs.audit_schedule_id AND aqs.audit_schedule_department_id = u1.deptId AND aqs.question_id = u1.questionId JOIN `users` u ON u.id = u1.sender_id JOIN `cinemas` c ON c.id = a.cinema_id JOIN `questionnaires` q ON q.id = u1.questionId WHERE u1.receiver_id =" + input.userId + " AND q.criticality = 'Critical' AND u1.status = 'New';")
    const [ultraCriticalCount, meta2] = await db.sequelize
      .query("SELECT COUNT(u1.id) as UCCount FROM `user_notifications` u1 JOIN `audit_schedules` a ON a.id = u1.audit_Id JOIN `audit_schedule_questionnaires` aqs ON u1.audit_Id = aqs.audit_schedule_id AND aqs.audit_schedule_department_id = u1.deptId AND aqs.question_id = u1.questionId JOIN `users` u ON u.id = u1.sender_id JOIN `cinemas` c ON c.id = a.cinema_id JOIN `questionnaires` q ON q.id = u1.questionId WHERE u1.receiver_id =" + input.userId + " AND q.criticality = 'Ultra Critical' AND u1.status = 'New';")
    let CCount = criticalCount && criticalCount.length > 0 ? criticalCount[0]['CCount'] : 0
    let UCCount = ultraCriticalCount && ultraCriticalCount.length > 0 ? ultraCriticalCount[0]['UCCount'] : 0
    if (resultData) {
      for (elem in resultData) {
        if (resultData[elem]['filePath'] !== '' || resultData[elem]['filePath'] !== null || resultData[elem]['filePath'] !== 'undefined') {
          let contentType = 'image/jpg';
          if (resultData[elem]['filePath'].endsWith('.PNG')) {
            contentType = 'image/png';
          }
          var imageBase64 = fs.readFileSync(resultData[elem]['filePath'], 'base64')
          resultData[elem]['filePath'] = "data:" + contentType + ";base64, " + imageBase64
        }
      }
      return res.status(200).json({ "tableData": resultData, "criticalCount": CCount, "ultraCriticalCount": UCCount })
    } else {
      return res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.updateNotificationStatus = async (req, res, next) => {
  try {
    let input = {
      notificationId: req.body.notificationId ? req.body.notificationId : 0,
      status: req.body.status ? req.body.status : '',
    }
    if (input.status !== '' || input.status !== null) {
      const [resultData, meta] = await db.sequelize
        .query("UPDATE `user_notifications` SET `user_notifications`.`status` = '" + input.status + "', `user_notifications`.`modified` = Now() WHERE `user_notifications`.`id` = " + input.notificationId + ";")
      if (input.status === "Approved & Forwarded") {
        let obj = {}
        let recipientList = ""
        const [userDetails, meta] = await db.sequelize
          .query("SELECT (SELECT `users`.`id` FROM `users` WHERE `users`.`role_id` = 8) as user_id, (SELECT `users`.`username` FROM `users` WHERE `users`.`role_id` = 8) as username, (SELECT `users`.`email` FROM `users` WHERE `users`.`role_id` = 8) as email, (SELECT `users`.`role_id` FROM `users` WHERE `users`.`role_id` = 8) as role_id, un.audit_Id,a.auditName, DATE_FORMAT(a.start_date,'%d-%b-%Y') as start_date, DATE_FORMAT(a.end_date,'%d-%b-%Y') as end_date, c.company_code, c.name as CinemaName, c.address, aqs.criticality, un.message, aqs.FILE_NAME as fileName, aqs.FILE_PATH as filePath, d.name as deptartmentName FROM `user_notifications` un JOIN `audit_schedules` a ON a.id = un.audit_Id JOIN `audit_schedule_questionnaires` aqs ON aqs.audit_schedule_id = un.audit_Id AND aqs.audit_schedule_department_id = un.deptId AND aqs.question_id = un.questionId JOIN `cinemas` c ON c.id = a.cinema_id JOIN `departments` d ON d.id = un.deptId WHERE un.id = " + input.notificationId + ";")
        if (userDetails && userDetails.length > 0) {
          for (let i = 0; i < userDetails.length; i++) {
            if (recipientList !== "") {
              recipientList = recipientList + "; " + userDetails[i].email
            } else {
              recipientList = userDetails[i].email
            }
          }
        }
        // return res.status(200).json({recipientList})
        let mailBody = "<div style={{fontFamily: 'Arial',fontSize: '14px',fontStyle: 'normal',fontWeight: 'normal',textDecoration: 'none',textTransform: 'none',color: '#000000',backgroundColor: '#ffffff'}}>" + userDetails[0].message + "</div>"
        let subject = userDetails[0].criticality + " " + userDetails[0].deptartmentName + " : " + userDetails[0].CinemaName + " " + userDetails[0].address + " dated " + userDetails[0].start_date + " to " + userDetails[0].end_date
        var email = recipientList
        var cc = ''
        Notification.sendNotification(mailBody, email, subject, 'high', cc, userDetails[0].fileName, userDetails[0].filePath)
      }
      if (input.status === "Rejected") {
        const [userDetails, meta] = await db.sequelize
          .query("SELECT u.username, u.email, u1.username as TLName, u1.email as TLEmail, un.audit_Id,a.auditName,DATE_FORMAT(a.start_date,'%d-%b-%Y') as start_date, DATE_FORMAT(a.end_date,'%d-%b-%Y') as end_date, c.company_code, c.name as CinemaName, c.address, aqs.criticality, un.message, aqs.FILE_NAME as fileName, aqs.FILE_PATH as filePath, d.name as deptartmentName FROM `user_notifications` un JOIN `users` u ON u.id = un.sender_id JOIN `users` u1 ON u1.id = un.receiver_id JOIN `audit_schedules` a ON a.id = un.audit_Id JOIN `cinemas` c ON a.cinema_id = c.id JOIN `departments` d ON d.id = un.deptId JOIN `audit_schedule_questionnaires` aqs ON aqs.audit_schedule_id = un.audit_Id AND aqs.audit_schedule_department_id = un.deptId AND aqs.question_id = un.questionId WHERE un.id = " + input.notificationId + ";")
        let message = "<p>Hi " + userDetails[0].username + ",</p><p>Your response has been rejected by TL (" + userDetails[0].TLName + ")</p><p><b>Regards,</b><br/>iProEDGE Team<br/>This is a system generated email. Please do not reply to this message.</p>"
        let mailBody = "<div style={{fontFamily: 'Arial',fontSize: '14px',fontStyle: 'normal',fontWeight: 'normal',textDecoration: 'none',textTransform: 'none',color: '#000000',backgroundColor: '#ffffff'}}>" + message + "</div>"
        let subject = userDetails[0].criticality + " " + userDetails[0].deptartmentName + " : " + userDetails[0].CinemaName + " " + userDetails[0].address + " dated " + userDetails[0].start_date + " to " + userDetails[0].end_date
        var email = userDetails[0].email
        var cc = ''
        // var cc = userDetails[0].TLEmail
        Notification.sendNotification(mailBody, email, subject, 'high', cc, userDetails[0].fileName, userDetails[0].filePath)
      }
      if (resultData) {
        return res.status(200).json({ msg: 'Update successfull', "data": resultData })
      } else {
        return res.status(500).json({ message: "Server Error" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

exports.CreateBulkUser = async (req, res, next) => {
  const excel_path = req.file.destination + "/" + req.file.filename;
  var workbook = XLSX.readFile(excel_path);
  var sheet_name_list = workbook.SheetNames;
  var sheet = workbook.Sheets[sheet_name_list[0]];
  var xlData = XLSX.utils.sheet_to_json(sheet, { raw: false });

  let [designation, meta] = await db.sequelize.query("SELECT * FROM roles");

  for (const item of xlData) {
    const role = designation.find((role) => role.name === item.designation);
    if (role) {
      item.role_id = role.id;
    }
  }

  console.log(xlData, "xlDataaaa");

  try {
    for (const item of xlData) {
      let username = item.firstname + item.lastname;

      const existingUser = await db.sequelize.query(
        "SELECT * FROM `users` WHERE mobile = '" + item.mobile + "'",
        { type: db.sequelize.QueryTypes.SELECT }
      );

      if (existingUser.length > 0) {
        console.log("User with mobile number already exists:", item);
        continue; // Skip inserting this user
      }

      const [data, meta] = await db.sequelize.query(
        "INSERT INTO `users` (username, role_id, first_name, last_name, email, mobile) VALUES ('" +
          username +
          "','" +
          item.role_id +
          "', '" +
          item.firstname +
          "', '" +
          item.lastname +
          "', '" +
          item.email +
          "', '" +
          item.mobile +
          "')"
      );
    }

    res.status(200).json({ message: "Users created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

