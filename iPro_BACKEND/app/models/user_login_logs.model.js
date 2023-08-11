module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("user_login_logs", {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true 
        },
        user_id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        ip_address: { 
            type: DataTypes.STRING(20), 
            allowNull: true 
        },
        created: { 
            type: DataTypes.BIGINT, 
            allowNull: true 
        },
    },{
        timestamps:false
    });
    return query; 
};