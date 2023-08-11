module.exports = (sequelize, DataTypes) => {
  const Countries = sequelize.define('countries', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'deleted'),
      allowNull: false,
      defaultValue: 'active',
    },
    created: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    modified: {
      type: DataTypes.BIGINT(20),
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  }, {
    timestamps: false
  });
  return Countries;
};
