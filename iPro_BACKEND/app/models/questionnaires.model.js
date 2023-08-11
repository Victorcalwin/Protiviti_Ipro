module.exports = (sequelize, DataTypes) => {
    const query = sequelize.define("questionnaires", {
        id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
        department_id: { type: DataTypes.STRING, allowNull: true },
        location_id: { type: DataTypes.INTEGER, allowNull: false },
        code: { type: DataTypes.INTEGER, allowNull: true },
        question: { type: DataTypes.TEXT, allowNull: true },
        score: { type: DataTypes.INTEGER, allowNull: true },
        audit_type: { type: DataTypes.ENUM('cinema', 'mystery'), allowNull: true },
        criticality: { type: DataTypes.ENUM('low', 'modarate', 'high', 'critical'), allowNull: true },
        is_mandatory: { type: DataTypes.ENUM('yes', 'no'), allowNull: true },
        Is_Attachment_Req: {type: DataTypes.STRING, allowNull: true},
        question_hint: { type: DataTypes.TEXT, allowNull: true },
        imagePath: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.ENUM('active', 'inactive', 'deleted'), allowNull: true },
        created: { type: DataTypes.BIGINT, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true },
        modified: { type: DataTypes.BIGINT, allowNull: true },
        modified_by: { type: DataTypes.INTEGER, allowNull: true },
        display_order: { type: DataTypes.INTEGER, allowNull: true },
        Q_Type: {type: DataTypes.STRING, allowNull: true},
        Opt1: {type: DataTypes.STRING, allowNull: true},
        Opt2: {type: DataTypes.STRING, allowNull: true},
        Opt3: {type: DataTypes.STRING, allowNull: true},
        Opt4: {type: DataTypes.STRING, allowNull: true},
        Opt5: {type: DataTypes.STRING, allowNull: true},
        Opt6: {type: DataTypes.STRING, allowNull: true},
        Max_Rating: {type: DataTypes.INTEGER, allowNull: true},      
    },{
        timestamps:false
    });
    return query;
};