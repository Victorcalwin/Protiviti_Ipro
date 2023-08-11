module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("role_permissions", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        role_id: { type: DataTypes.INTEGER, allowNull: true },
        module: { type: DataTypes.STRING(255), allowNull: true },
        right_view: { type: DataTypes.INTEGER, allowNull: true },
        right_add: { type: DataTypes.INTEGER, allowNull: true },
        right_edit: { type: DataTypes.INTEGER, allowNull: true },
        right_delete: { type: DataTypes.INTEGER, allowNull: true },
        right_others: { type: DataTypes.INTEGER, allowNull: true },
        created: { type: DataTypes.BIGINT, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        modified: { type: DataTypes.BIGINT, allowNull: true },
        modified_by: { type: DataTypes.INTEGER, allowNull: true },
    },{
        timestamps:false
    });
    return query; 
};