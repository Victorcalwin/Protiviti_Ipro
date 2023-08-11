module.exports = (sequelize, DataTypes) => {
    const AuditScheduleUserPermission = sequelize.define('audit_schedule_user_permissions', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        audit_schedule_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        audit_schedule_department_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        audit_schedule_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    },{
        timestamps:false
    });
    return AuditScheduleUserPermission
}
