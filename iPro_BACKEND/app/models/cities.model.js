
module.exports = (sequelize, DataTypes)=>{
    const Cities = sequelize.define('cities', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    state_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted'),
        allowNull: false,
        defaultValue: 'active'
    },
    created: {
        type: DataTypes.BIGINT(20),
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    modified: {
        type: DataTypes.BIGINT(20),
        allowNull: true
    },
    modified_by: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
},{
    timestamps:false
});
return Cities
}

// module.exports = Cities
