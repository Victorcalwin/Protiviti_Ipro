module.exports = (sequelize, DataTypes) => {

    const audit_schedule_questionnaire_editobservations = sequelize.define('audit_schedule_questionnaire_editobservations', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      Role_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      audit_schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      department_Id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      audit_schedule_questionnaire_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      observations: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
    },{
      timestamps:false
  });
  
    return audit_schedule_questionnaire_editobservations;
  }
  