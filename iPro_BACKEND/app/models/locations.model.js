module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('locations', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        display_order: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        icon: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'deleted'),
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        modified: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },{
        timestamps:false
    });
    return Location
}
