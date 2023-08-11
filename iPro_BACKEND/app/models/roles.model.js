module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("roles", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type:DataTypes.STRING(100), allowNull: true },
        status: { type:DataTypes.STRING(20), allowNull: true },
        created: { type: DataTypes.BIGINT, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        modified: { type: DataTypes.BIGINT, allowNull: true },
        modified_by: { type: DataTypes.INTEGER, allowNull: true },
    },{
        timestamps:false
    });
    return query; 
};