const db = require("../models");
const Cinemas = db.cinemas;
const Department=db.Department;
const Regions=db.regions;
const States=db.states;
const cities=db.states;
const Op = db.Sequelize.Op;
const _ = require("lodash");
const XLSX = require("xlsx");


exports.getAllCinemas = async (req, res, next) => {
  try {

    let query = "SELECT c.*, CONCAT_WS(' ', u.`first_name`, u.`last_name`) as CinemaManeger, u.email as userEmail, u.mobile as userMobile FROM `cinemas` c JOIN users u ON u.id = c.cinema_manager_id"

    if(req.body.regionVal){
       query += " WHERE c.region_id = '"+req.body.regionVal+"'"
    }
    const [data, meta] = await db.sequelize.query(query)
    res.status(200).json(data);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.postAllCinemas = async (req, res, next) => {
  try {
    // const data = await Cinemas.findAll()
    const [Cinemas,meta]=await db.sequelize
    .query("SELECT cm.*,usr.username,cts.name as cityname,sts.name as statename from cinemas cm LEFT JOIN states sts ON sts.id=cm.state_id LEFT JOIN cities cts ON cts.id=cm.city_id LEFT JOIN users usr ON usr.id=cm.cinema_manager_id  ORDER BY cm.`id` DESC;")
    // console.log("iuygtfcgvwbd",Cinemas)
    res.status(200).json({Cinemas:Cinemas});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
exports.getAllRegions = async (req, res, next) => {
  try {
    // const data=await Regions.findAll()
    // const data = await Cinemas.findAll()\
    const [Regions,meta]=await db.sequelize
    .query("SELECT id,name FROM `regions`")
    res.status(200).json(Regions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getAllStateByRegion = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [States,meta]=await db.sequelize
    .query('SELECT st.* from `states` st LEFT JOIN regions rg ON rg.id=st.region_id where rg.id="'+Id+'"')
    res.status(200).json(States);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getAllCitesByState = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [cities,meta]=await db.sequelize
    .query('SELECT ct.* from `cities` ct LEFT JOIN states st ON st.id=ct.state_id where st.id="'+Id+'"')
    
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.AddNewCinema = async (req, res, next) => {
  try {
    // console.log("Backend data is checking",req.body)
    const datas=await Cinemas.create(req.body)
    const [id,meta]=await db.sequelize
    .query("select id from cinemas ORDER BY id DESC LIMIT 1")
    console.log(id,"iddddd")
    const [department,meta1]=await db.sequelize
    .query("INSERT INTO `cinemas_departments`(`cinema_id`, `department_id`, `department_Manager`) VALUES ('"+id[0].id+"','"+req.body.Department+"','1')");
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.DeleteCinema = async (req, res, next) => {
  try {
    const Id = req.params.id
    const [Cinemas,meta]=await db.sequelize
    .query('DELETE FROM `cinemas` WHERE id="'+Id+'"')
    res.status(200).json({message:'successfully deleted'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.UpdateCinema = async (req, res, next) => {
  try {
    const ID = req.params.id
    const data=Cinemas.update(req.body,{
      where:{id:ID}
    })
    res.status(200).json({message:'successfully Update'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
  exports.BulkCinemas = async (req, res, next) => {
    try {
      const excel_path = req.file.destination + "/" + req.file.filename;
      var workbook = XLSX.readFile(excel_path);
      var sheet_name_list = workbook.SheetNames;
      var sheet = workbook.Sheets[sheet_name_list[0]];
      var xlData = XLSX.utils.sheet_to_json(sheet, { raw: false });

    
      let [departments, meta2] = await db.sequelize.query("SELECT * FROM departments")
      let [regions, meta3] = await db.sequelize.query("SELECT * FROM regions")
      let [states, meta4] = await db.sequelize.query("SELECT * FROM states")
      let [cities, meta5] = await db.sequelize.query("SELECT * FROM cities")
      let [users, meta6] = await db.sequelize.query("SELECT * FROM users")
      let [cinemas, meta7] = await db.sequelize.query("SELECT * FROM cinemas")
      
      xlData.forEach((item)=>{
        const region_id = regions.find((region) => region.name == item.region)
        if(region_id){
          item.region_id = region_id.id;
        }
      })
      xlData.forEach((item)=>{
        const state = states.find((state) => state.name == item.state && state.region_id == item.region_id)
        if(state){
          item.state_id = state.id;
        }
      })
      xlData.forEach((item)=>{
        const city = cities.find((cities) => cities.name == item.city && cities.state_id == item.state_id)
        if(city){
          item.city_id = city.id;
        }
      })
      xlData.forEach((item)=>{    
        const user = users.find((users) => users.username == item.cinema_manager && users.role_id == "7" )
        if(user){
          item.cinema_manager_id = user.id;
        }
      })
      xlData.forEach((item)=>{    
        const department = departments.find((depart) => depart.name == item.department)
        if(department){
          item.departmentId = department.id;
        }
      })
      const filteredData = xlData.filter((data)=>{
        return cinemas.some(cinema => cinema.name === data.name)
      })

      console.log(filteredData,"sdfljsaldf")
      console.log(filteredData.length,"sdfljsaldf")
      console.log(xlData.length,"sdfljsaldf")
      let responseSent = false;

      await Promise.all(xlData.map(async (item) => {
        if (filteredData.length === 0) {
          const datas = await Cinemas.create(item);
          // console.log(datas,"asdflasdjf")
          if (datas) {
            const [id, meta] = await db.sequelize
              .query("select id from cinemas ORDER BY id DESC LIMIT 1");
            // console.log(id,"kasdfljaksd")
            const [department, meta1] = await db.sequelize
              .query("INSERT INTO `cinemas_departments`(`cinema_id`, `department_id`, `department_Manager`) VALUES ('" + id[0].id + "','" + item.departmentId + "','1')");
          }
        } else {
          if (!responseSent) {
            
            responseSent = true;

            console.log("Given excel data is Cinema Name or Region is mismatch");
            return res.status(200).json({ message: "Cinema Name is already Present" });
          }
        }
      }));

      
      if (!responseSent) {
        return res.status(200).json({ message: "Success" });
      }

    } catch (error) {
      return res.status(500).json({ message: "An error occurred while processing the upload" });
    }
  };

