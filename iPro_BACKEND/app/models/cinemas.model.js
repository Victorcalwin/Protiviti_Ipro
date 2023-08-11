module.exports = (sequelize, DataTypes) => {
    const Cinema = sequelize.define('cinemas', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        latitude: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        longitude: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        zip_code: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        cinema_manager_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        company_code:{
            type: DataTypes.STRING(100),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        mall_name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        no_of_seat: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        no_of_screens: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cinema_type: {
            type: DataTypes.ENUM('platinum', 'gold', 'silver'),
            allowNull: true
        },
        frequency: {
            type: DataTypes.ENUM('monthly', 'quartly', 'halfyearly', 'annually'),
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
        company_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    },{
        timestamps:false
    });
    return Cinema
}
