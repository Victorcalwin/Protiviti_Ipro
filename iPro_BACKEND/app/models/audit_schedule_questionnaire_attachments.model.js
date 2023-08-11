module.exports = (sequelize, DataTypes) => {
  const AuditScheduleQuestionnaireAttachment = sequelize.define('audit_schedule_questionnaire_attachments', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    audit_schedule_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    audit_schedule_questionnaire_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    attachment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created: {
      type: DataTypes.BIGINT(20),
      allowNull: true
    }
  },{
    timestamps:false
});

  return AuditScheduleQuestionnaireAttachment;
}
