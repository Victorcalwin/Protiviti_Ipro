module.exports = (sequelize, Sequelize) => {
    const AuditScheduleDepartment = sequelize.define("audit_schedule_department", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      audit_schedule_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING(100),
        allowNull: true
      }
    },{
      timestamps:false
  });
  
    return AuditScheduleDepartment;
  };
  