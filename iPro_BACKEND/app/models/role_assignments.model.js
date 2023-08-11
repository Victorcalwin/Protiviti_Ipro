module.exports = (sequelize, DataTypes) => { 
    const query = sequelize.define("role_assignments", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        role_id: { type: DataTypes.INTEGER, allowNull: true },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        assignment_id: { type: DataTypes.INTEGER, allowNull: true },
        created: { type: DataTypes.BIGINT, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        modified: { type: DataTypes.BIGINT, allowNull: true },
        modified_by: { type: DataTypes.INTEGER, allowNull: true },
    },{
        timestamps:false
    });
    return query; 
};