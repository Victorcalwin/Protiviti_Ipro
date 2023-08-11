const db = require("../models");
const Department = db.Department;
const Op = db.Sequelize.Op;
const _ = require("lodash");
const XLSX = require("xlsx");


exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.findAll(
      {order: [
        ['id', 'DESC'],
      ]}
    )
    res.status(200).json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.CreateDepartment = async (req, res, next) => {
  try {
    const departments = await Department.create(req.body)
    res.status(200).json(departments);;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.UpdateDepartment = async (req, res, next) => {
  try {
    const departments = await Department.update(
      {
        id: req.body.id, 
        name: req.body.name,
        description: req.body.description,
      },
      {where:{id:req.body.id}}
    )
    res.status(200).json(departments);;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getDepartmentsoncinema = async (req, res, next) => {
  try {
    let query = "SELECT DISTINCT d.*, cd.department_Manager, CONCAT_WS(' ', u.`first_name`, u.`last_name`) as username, u.email as userEmail, u.mobile as userMobile FROM `departments` d Left join `cinemas_departments` cd on cd.department_id = d.id Left Join `users` u on u.id = cd.department_Manager where 1=1"

    if(req.body.cinemaId){
      query += " And cd.cinema_id = "+req.body.cinemaId
    }
    const [department,meta] = await db.sequelize.query(query)
    res.status(200).send({ message: "success", data: department});
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.DeleteDepartment = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [Cinemas,meta]=await db.sequelize
    .query('DELETE FROM `departments` WHERE id="'+Id+'"')
    res.status(200).json({message:'successfully deleted'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.BulkCreateDepartment = async (req, res, next) => {
  const excel_path = req.file.destination + "/" + req.file.filename;
  var workbook = XLSX.readFile(excel_path);
  var sheet_name_list = workbook.SheetNames;
  var sheet = workbook.Sheets[sheet_name_list[0]];
  var xlData = XLSX.utils.sheet_to_json(sheet, { raw: false });
  console.log(xlData, "xlDataaaa");

  try {
    for (const item of xlData) {
      await Department.create(item);
    }
    res.status(200).json({ message: "Departments created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
