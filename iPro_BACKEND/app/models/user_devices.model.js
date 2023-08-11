module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("user_devices", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        device_type: { type: DataTypes.ENUM('android', 'ios'), allowNull: true },
        device_id: { type: DataTypes.STRING(255), allowNull: true },
        device_token: { type: DataTypes.STRING(255), allowNull: true },
        created: { type: DataTypes.BIGINT, allowNull: true },
    },{
        timestamps:false
    });
    return query; 
};