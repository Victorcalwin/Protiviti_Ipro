module.exports = (sequelize, DataTypes) => {

  const AuditScheduleQuestionnaireComment = sequelize.define('audit_schedule_questionnaire_comments', {
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
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  },{
    timestamps:false
});

  return AuditScheduleQuestionnaireComment;
}
