module.exports = (sequelize, Sequelize) => {
    const AuditScheduleQuestionnaire = sequelize.define('audit_schedule_questionnaire', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      audit_schedule_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      audit_schedule_department_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      audit_schedule_sub_department_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      code: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      question_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      question: {
        type: Sequelize.STRING,
        allowNull: true
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Is_Attachment_Req:{
        type: Sequelize.STRING,
        allowNull: true
      },
      FILE_NAME: {
        type: Sequelize.STRING,
        allowNull: true
      },
      FILE_PATH: {
        type: Sequelize.STRING,
        allowNull: true
      },
      MIME_TYPE: {
        type: Sequelize.STRING,
        allowNull: true
      },
      score: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      audit_type: {
        type: Sequelize.ENUM('mystery', 'cinema'),
        allowNull: true
      },
      criticality: {
        type: Sequelize.ENUM('low', 'moderate', 'high', 'critical'),
        allowNull: true
      },
      is_mandatory: {
        type: Sequelize.ENUM('yes', 'no'),
        allowNull: true
      },
      question_hint: {
        type: Sequelize.STRING,
        allowNull: true
      },
      scope_area: {
        type: Sequelize.STRING,
        allowNull: true
      },
      escalations: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },{
      timestamps:false
  });
  
    return AuditScheduleQuestionnaire;
  };
  