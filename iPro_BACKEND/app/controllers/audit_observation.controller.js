const db = require("../models");
const _ = require("lodash");
const audit_observation = db.audit_observation;
const Op = db.Sequelize.Op;

exports.auditobsersubmit = async (req, res, next)=>{
    console.log(req.file, "obwervation")
    try {
        if(req.file){
            let image_path = "C:/images"
            image_path = image_path + "/" + req.file.filename
            const [data, meta] = await db.sequelize.query("INSERT INTO audit_observation (audit_id, dept_id, audit_message, file_name, file_path, mime_type) VALUES ('"+req.body.data.auditId+"','"+req.body.data.deptId+"', '"+req.body.data.observation+"', '"+req.file.filename+"', '"+image_path+"','"+req.file.mimetype+"');")
          }else{
            const [data, meta] = await db.sequelize.query("INSERT INTO audit_observation (audit_id, dept_id, audit_message) VALUES ('"+req.body.data.auditId+"','"+req.body.data.deptId+"', '"+req.body.data.observation+"');")
          }
          
   
    
      
      res.status(200).send(message= 'success');
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  } 
  