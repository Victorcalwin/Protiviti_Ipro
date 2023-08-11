module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("settings", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        password_attempts: {  type: DataTypes.INTEGER, allowNull: true },
        email_contact: { type: DataTypes.STRING(200), allowNull: true },
        email_noreply: { type: DataTypes.STRING(200), allowNull: true },
        email_registration: { type: DataTypes.STRING(200), allowNull: true },
        modified: { type: DataTypes.BIGINT, allowNull: true },
        modified_by: { type: DataTypes.INTEGER, allowNull: true },
    },{
        timestamps:false
    });
    return query; 
};