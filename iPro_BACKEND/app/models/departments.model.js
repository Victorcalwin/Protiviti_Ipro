// please 
module.exports = (sequelize, DataTypes)=>{
    const Department = sequelize.define('departments', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        display_order: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        icon: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'deleted'),
            allowNull: false
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
        }
    },{
        timestamps:false
    });
    return Department
}
