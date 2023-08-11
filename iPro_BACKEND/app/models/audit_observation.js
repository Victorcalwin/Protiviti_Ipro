module.exports = (sequelize, DataTypes) => {
    const audit_observation = sequelize.define('audit_observation', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        audit_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dept_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        audit_message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        file_name: {
            type: Sequelize.STRING,
            allowNull: true
          },
          file_path: {
            type: Sequelize.STRING,
            allowNull: true
          },
          mime_type: {
            type: Sequelize.STRING,
            allowNull: true
          },
       
    });
    return audit_observation
}
