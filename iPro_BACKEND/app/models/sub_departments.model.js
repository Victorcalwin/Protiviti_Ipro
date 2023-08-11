module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("sub_departments", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        department_id: { type: DataTypes.INTEGER, allowNull: true },
        name: { type: DataTypes.STRING(100), allowNull: true },
        description: { type: DataTypes.STRING(255), allowNull: true },
        icon: { type: DataTypes.STRING(100), allowNull: true },
        status: { type: DataTypes.ENUM('active', 'inactive', 'deleted'), allowNull: true },
        created: { type: DataTypes.BIGINT, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        modified: { type: DataTypes.BIGINT, allowNull: true },
        modified_by: { type: DataTypes.INTEGER, allowNull: true },
    },{
        timestamps:false
    });
    return query; 
};