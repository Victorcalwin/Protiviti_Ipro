const db = require("../models");
const question = db.questionnaires;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const _ = require("lodash");
const XLSX = require("xlsx");

exports.getAllquestion = async (req, res, next) => {
  
  try {
    let questions;
    if (req.body.deptId) {
      const [data1, meta] = await db.sequelize
      .query("SELECT (SELECT GROUP_CONCAT(d.name ORDER BY d.id) FROM `departments` d WHERE find_in_set(d.id, q.department_id)) as departmentNames ,q.* FROM `questionnaires` q where q.department_id = '"+req.body.deptId+"' ORDER BY q.`id` DESC;")
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error });
      })
    // questions = await question.findAll({
    //   order: [
    //     ['display_order', 'ASC'],
    //   ]
    // })
    questions = data1

    }
    else {
      const [data1, meta] = await db.sequelize
        .query("SELECT (SELECT GROUP_CONCAT(d.name ORDER BY d.id) FROM `departments` d WHERE find_in_set(d.id, q.department_id)) as departmentNames ,q.* FROM `questionnaires` q ORDER BY q.`id` DESC;")
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: error });
        })
      // questions = await question.findAll({
      //   order: [
      //     ['display_order', 'ASC'],
      //   ]
      // })
      questions = data1
    }

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].imagePath !== null && questions[i].imagePath !== '') {
        const imagePath = path.join(questions[i].imagePath);

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
        if (questions[i].imagePath.endsWith('.PNG')) {
          contentType = 'image/png';
        }
        questions[i].imagePath = "data:" + contentType + ";base64, " + imageurl;
      }
    }
    res.set('Content-Type', 'application/json');

    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

exports.CreateQuestion = async (req, res, next) => {
  console.log(req.body,"adflksjdfl")
  try {
    const image_path = 'C:/images'
    const data = req.body.postData
    console.log(data)
    if(req.file){
      data.imagePath = image_path + "/" + req.file.filename
    }
    const questions = await question.create(data)
    res.status(200).json(questions);;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

exports.UpadateQuestion = async (req, res, next) => {
  try {
    const image_path = 'C:/images'
    const data = req.body.postData
    if(req.file){
      data.imagePath = image_path + "/" + req.file.filename
    }
    const questions = await question.update(
      data,
      {where:{id:req.body.postData.id}}
    )
    res.status(200).json(questions);;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}


exports.GetQuestionByDepartment = async (req, res, next) => {
  try {
    const data = req.body.Department
    let questions = await question.findAll({
      where: {
        department_id: data
      }
    })
    res.status(200).json(questions);;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

exports.DeleteQuestion = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [Cinemas,meta]=await db.sequelize
    .query('DELETE FROM `questionnaires` WHERE id="'+Id+'"')
    res.status(200).json({message:'successfully deleted'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.BulkQuestionCreate = async (req, res, next) => {
  const excel_path = req.file.destination + "/" + req.file.filename;
  var workbook = XLSX.readFile(excel_path);
  var sheet_name_list = workbook.SheetNames;
  var sheet = workbook.Sheets[sheet_name_list[0]];
  var xlData = XLSX.utils.sheet_to_json(sheet, { raw: false });
 
  const updatedData = xlData.map(obj => ({
    ...obj,
    is_mandatory: 'Yes',
    audit_type: 'cinema',
    Is_Attachment_Req: 'Yes',
    location_id: '1',
    status: 'ACTIVE'

  }));
  let [departments, meta2] = await db.sequelize.query("SELECT * FROM departments")
  const departmentNames = departments.map(department => department.name);

  for (const data of updatedData) {
    const departmentIdsPresent = departments
      .filter(department => data.department.includes(department.name))
      .map(department => department.id);
    
    data.department_id = departmentIdsPresent.join(',');
  }
  
  console.log(updatedData);
  try {
    
    for (const item of updatedData) {
      const data = item;
      const questions = await question.create(data);
      console.log("Question created:", questions);
    }
    res.status(200).json({ message: "Bulk questions created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};