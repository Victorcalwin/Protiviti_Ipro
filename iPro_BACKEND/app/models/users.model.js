module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        username: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        role_id: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true
        },
        mobile: {
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true
        },
        avatar: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        finger_print: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        secret_key: { 
            type: DataTypes.STRING(255), 
            allowNull: true
         },
        email_verified: { 
            type: DataTypes.ENUM('yes', 'no'), 
            allowNull: true 
        },
        otp: { 
            type: DataTypes.STRING(10), 
            allowNull: true 
        },
        email_notifications: { 
            type: DataTypes.ENUM('yes', 'no'), 
            allowNull: true 
        },
        push_notifications: { 
            type: DataTypes.ENUM('yes', 'no'), 
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
        last_login: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        last_login_ip: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    },{
        timestamps:false
    });
    return User;
};