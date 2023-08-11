module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("user_otps", {
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
        otp: { 
            type: DataTypes.STRING(20), 
            allowNull: true 
        },
        end_date: { type: DataTypes.BIGINT, 
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