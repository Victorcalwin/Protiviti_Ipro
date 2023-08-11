const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  // port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Cities = require("./cities.model")(sequelize, Sequelize);
db.Department=require("./departments.model")(sequelize,Sequelize);
db.audit_schedule_departments = require("./audit_schedule_departments.model")(sequelize, Sequelize);
db.audit_schedule_questionnaire_answers = require("./audit_schedule_questionnaire_answers.model")(sequelize, Sequelize);
db.audit_schedule_questionnaire_attachments = require("./audit_schedule_questionnaire_attachments.model")(sequelize, Sequelize);
db.audit_schedule_questionnaire_comments = require("./audit_schedule_questionnaire_comments.model")(sequelize, Sequelize);
db.audit_schedule_questionnaire_editobservations = require("./audit_schedule_questionnaire_editobservation")(sequelize, Sequelize);
db.audit_schedule_questionnaires = require("./audit_schedule_questionnaires.model")(sequelize, Sequelize)
db.audit_schedule_sub_departments = require("./audit_schedule_sub_departments.model")(sequelize, Sequelize);
db.audit_schedule_user_permissions = require("./audit_schedule_user_permissions.model")(sequelize, Sequelize);
db.audit_schedule_users = require("./audit_schedule_users.model")(sequelize, Sequelize);
db.audit_schedules = require("./audit_schedules.model")(sequelize, Sequelize);
db.cinemas = require("./cinemas.model")(sequelize, Sequelize);
db.countries = require("./countries.model")(sequelize, Sequelize);
db.locations = require("./locations.model")(sequelize, Sequelize);
db.questionnaires = require("./questionnaires.model")(sequelize, Sequelize);
db.regions = require("./regions.model")(sequelize, Sequelize);
db.role_assignments = require("./role_assignments.model")(sequelize, Sequelize);
db.role_permissions = require("./role_permissions.model")(sequelize, Sequelize);
db.roles = require("./roles.model")(sequelize, Sequelize);
db.settings = require("./settings.model")(sequelize, Sequelize);
db.states = require("./states.model")(sequelize, Sequelize);
db.sub_departments = require("./sub_departments.model")(sequelize, Sequelize);
db.user_devices = require("./user_devices.model")(sequelize, Sequelize);
db.user_login_logs = require("./user_login_logs.model")(sequelize, Sequelize);
db.user_notifications = require("./user_notifications.model")(sequelize, Sequelize);
db.user_otps = require("./user_otps.model")(sequelize, Sequelize);
db.user_passwords = require("./user_passwords.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
module.exports = db;
