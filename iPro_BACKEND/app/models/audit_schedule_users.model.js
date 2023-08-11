module.exports = (sequelize, DataTypes) => {
    const AuditScheduleUser = sequelize.define('audit_schedule_users', {
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        current_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_team_lead: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },{
        timestamps:false
    });
    return AuditScheduleUser
}
