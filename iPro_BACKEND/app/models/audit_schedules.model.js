module.exports = (sequelize, DataTypes) => {
    const AuditSchedules = sequelize.define("audit_schedules", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      cinema_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      auditName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      scheduling_type: {
        type: DataTypes.ENUM('cinema', 'mystery'),
        allowNull: true
      },
      audit_status: {
        type: DataTypes.ENUM('pending', 'on_going', 'completed'),
        allowNull: true
      },
      current_status: {
        type: DataTypes.ENUM('open', 'waiting for approval', 'send back by...'),
        allowNull: true
      },
      created: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      modified: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      month: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      previous_audit_score: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      notification_status: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: "UNREAD",

      },
    },{
      timestamps:false
  });
  
    return AuditSchedules;
  };
  