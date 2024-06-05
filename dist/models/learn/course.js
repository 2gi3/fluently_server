import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
class Course extends Model {
}
Course.init({
    id: {
        type: DataTypes.STRING(150),
        primaryKey: true,
        allowNull: false,
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        }
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    mediumLanguage: {
        type: DataTypes.ENUM('english', 'thai'),
        allowNull: false,
    },
    learningLanguage: {
        type: DataTypes.ENUM('english', 'thai'),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    subheading: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    introductionMD: {
        type: DataTypes.STRING(600),
        allowNull: true,
    },
    goalsMD: {
        type: DataTypes.STRING(600),
        allowNull: true,
    },
    requirementsMD: {
        type: DataTypes.STRING(600),
        allowNull: true,
    },
    videoUrl: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Course",
    tableName: "courses",
    timestamps: false,
    createdAt: 'created_at'
});
export default Course;
Course.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
//# sourceMappingURL=course.js.map