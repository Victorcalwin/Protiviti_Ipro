module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("user_notifications", {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED, 
            allowNull: false, primaryKey: true, 
            autoIncrement: true 
        },
        type: { 
            type: DataTypes.ENUM('common'), 
            allowNull: true 
        },
        sender_id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        receiver_id: { 
            type: DataTypes.INTEGER, 
            allowNull: true 
        },
        message: { 
            type: DataTypes.TEXT, 
            allowNull: true },
        read_status: { 
            type: DataTypes.ENUM('read', 'unread'), 
            allowNull: true 
        },
        status: { 
            type: DataTypes.ENUM('active', 'deleted'), 
            allowNull: true },
        created: { 
            type: DataTypes.BIGINT, 
            allowNull: true 
        },
        modified: { 
            type: DataTypes.BIGINT, 
            allowNull: true 
        },
    },{
        timestamps:false
    });
    return query; 
};