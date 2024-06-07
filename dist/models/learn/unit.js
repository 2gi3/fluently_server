import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import Course from "./course.js";
class CourseUnit extends Model {
}
CourseUnit.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Course',
            key: 'id',
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "CourseUnit",
    tableName: "courseUnits",
    timestamps: false,
    createdAt: 'created_at'
});
export default CourseUnit;
CourseUnit.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Course.hasMany(CourseUnit, { foreignKey: 'courseId', as: 'units' });
//# sourceMappingURL=unit.js.map