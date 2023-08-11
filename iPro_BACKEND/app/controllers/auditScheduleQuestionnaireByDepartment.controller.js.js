const db = require("../models");
const questionnaire = db.audit_schedule_questionnaires;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.postAuditScheduleQuestionnaireByDepartment = async (req, res, next) => {
  try {
    let query = "SELECT asq.*, q.Opt1,q.Opt2,q.Opt3,q.Opt4,q.Opt5,q.Opt6, q.Q_Type, q.criticality as criticalval, q.Max_Rating, q.imagePath, asq.more_details FROM `audit_schedule_questionnaires` asq JOIN `questionnaires` q ON asq.question_id = q.id WHERE 1=1"
      
      if(req.body.auditId){
       query += " And asq.audit_schedule_id = " + req.body.auditId + ""
      }
      if(req.body.depatmentId){
        query +=" AND asq.audit_schedule_department_id = "+ req.body.depatmentId+""
      }
      
      console.log(req.body.depatmentId, query, "skjdbfkjsbdkfbkdsfjksdbfdkj")
   
    let [resultData, meta] = await db.sequelize
    .query(query)
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    })
      resultData.map((el,index)=>{
        let optionArr = []
        if(el.Q_Type=='multiple' && el.answer==""){
        resultData[index].answer='tets';
         }
        if (el.Opt1 != '') {
          optionArr.push({ label: el.Opt1, value: el.Opt1, id: "1" })
        }
        if (el.Opt2 != '') {
          optionArr.push({ label: el.Opt2, value: el.Opt2, id: "2" })
        }
        if (el.Opt3 != '') {
          optionArr.push({ label: el.Opt3, value: el.Opt3, id: "3" })
        }
        if (el.Opt4 != '') {
          optionArr.push({ label: el.Opt4, value: el.Opt4, id: "4" })
        }
        if (el.Opt5 != '') {
          optionArr.push({ label: el.Opt5, value: el.Opt5, id: "5" })
        }
        if (el.Opt6 != '') {
          optionArr.push({ label: el.Opt6, value: el.Opt6, id: "6" })
        }
        el.options = optionArr
      })
      for (let i = 0; i < resultData.length; i++) {
        if (resultData[i].imagePath !== null) {
          const imagePath = path.join(resultData[i].imagePath);
  
          const image = await new Promise((resolve, reject) => {
            fs.readFile(imagePath, (err, data) => {
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
          if (resultData[i].imagePath.endsWith('.PNG')) {
            contentType = 'image/png';
          }
          resultData[i].imagePath = "data:" + contentType + ";base64, " + imageurl;
        }
      }
      for (let i = 0; i < resultData.length; i++) {
        if (resultData[i].FILE_PATH !== null) {
          const FILE_PATH = path.join(resultData[i].FILE_PATH);
  
          const image = await new Promise((resolve, reject) => {
            fs.readFile(FILE_PATH, (err, data) => {
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
          if (resultData[i].FILE_PATH.endsWith('.PNG')) {
            contentType = 'image/png';
          }
          resultData[i].FILE_PATH = "data:" + contentType + ";base64, " + imageurl;
        }
      }
      
let totalmarks = 0;

let totalmarkscanobtain = 0

resultData.map((item) => {
  if(item.answer != "NA" && item.answer != "NA_" && item.score){
    totalmarks = totalmarks + (item.answer*item.score)  
  }
})


resultData.map((item) => {
  if(item.answer != '' && item.answer != 'NA' && item.answer != "NA_"){
    const values = item.options.map(obj => parseFloat(obj.value)).filter(value => !isNaN(value));
    totalmarkscanobtain = totalmarkscanobtain + (Math.max(...values)*item.score)
  }
})
// console.log('total Score', totalmarkscanobtain)
      const responseOject = {
        mark: totalmarks,
        total: totalmarkscanobtain,
        data: resultData
      }
      res.status(200).json(responseOject);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

exports.postAuditScheduleQuestionnaireByDepartmentALL = async (req, res, next) => {
  try {
    let query = "SELECT asq.*, q.Opt1,q.Opt2,q.Opt3,q.Opt4,q.Opt5,q.Opt6, q.Q_Type, q.criticality as criticalval, q.Max_Rating, q.imagePath, asq.more_details FROM `audit_schedule_questionnaires` asq JOIN `questionnaires` q ON asq.question_id = q.id WHERE 1=1"
      
      if(req.body.auditId){
       query += " And asq.audit_schedule_id = " + req.body.auditId + ""
      }
      if(req.body.depatmentId){
       " AND asq.audit_schedule_department_id = " + req.body.depatmentId+""
      }
      
   
    let [resultData, meta] = await db.sequelize
    .query(query)
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    })
      resultData.map((el,index)=>{
        let optionArr = []
        if(el.Q_Type=='multiple' && el.answer==""){
        resultData[index].answer='tets';
         }
        if (el.Opt1 != '') {
          optionArr.push({ label: el.Opt1, value: el.Opt1, id: "1" })
        }
        if (el.Opt2 != '') {
          optionArr.push({ label: el.Opt2, value: el.Opt2, id: "2" })
        }
        if (el.Opt3 != '') {
          optionArr.push({ label: el.Opt3, value: el.Opt3, id: "3" })
        }
        if (el.Opt4 != '') {
          optionArr.push({ label: el.Opt4, value: el.Opt4, id: "4" })
        }
        if (el.Opt5 != '') {
          optionArr.push({ label: el.Opt5, value: el.Opt5, id: "5" })
        }
        if (el.Opt6 != '') {
          optionArr.push({ label: el.Opt6, value: el.Opt6, id: "6" })
        }
        el.options = optionArr
      })
      for (let i = 0; i < resultData.length; i++) {
        if (resultData[i].imagePath !== null) {
          const imagePath = path.join(resultData[i].imagePath);
  
          const image = await new Promise((resolve, reject) => {
            fs.readFile(imagePath, (err, data) => {
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
          if (resultData[i].imagePath.endsWith('.PNG')) {
            contentType = 'image/png';
          }
          resultData[i].imagePath = "data:" + contentType + ";base64, " + imageurl;
        }
      }
      for (let i = 0; i < resultData.length; i++) {
        if (resultData[i].FILE_PATH !== null) {
          const FILE_PATH = path.join(resultData[i].FILE_PATH);
  
          const image = await new Promise((resolve, reject) => {
            fs.readFile(FILE_PATH, (err, data) => {
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
          if (resultData[i].FILE_PATH.endsWith('.PNG')) {
            contentType = 'image/png';
          }
          resultData[i].FILE_PATH = "data:" + contentType + ";base64, " + imageurl;
        }
      }
      
let totalmarks = 0;

let totalmarkscanobtain = 0

resultData.map((item) => {
  if(item.answer != "NA" && item.answer != "NA_" && item.score){
    totalmarks = totalmarks + (item.answer*item.score)  
  }
})


resultData.map((item) => {
  if(item.answer != '' && item.answer != 'NA' && item.answer != "NA_"){
    const values = item.options.map(obj => parseFloat(obj.value)).filter(value => !isNaN(value));
    totalmarkscanobtain = totalmarkscanobtain + (Math.max(...values)*item.score)
  }
})
// console.log('total Score', totalmarkscanobtain)
      const responseOject = {
        mark: totalmarks,
        total: totalmarkscanobtain,
        data: resultData
      }
      res.status(200).json(responseOject);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}


