module.exports = (sequelize, DataTypes) => {

  const AuditScheduleQuestionnaireAnswer = sequelize.define('audit_schedule_questionnaire_answers', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    audit_schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    audit_schedule_questionnaire_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answer: {
      type: DataTypes.ENUM('yes', 'no', 'na'),
      allowNull: true,
    },
    created: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },{
    timestamps:false
});
  return AuditScheduleQuestionnaireAnswer;
};
