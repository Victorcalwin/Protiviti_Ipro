module.exports = (sequelize, DataTypes) => {
    const AuditScheduleSubDepartment = sequelize.define('audit_schedule_sub_department', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        audit_schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        audit_schedule_department_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        icon: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },{
        timestamps:false
    });
    return AuditScheduleSubDepartment
}
