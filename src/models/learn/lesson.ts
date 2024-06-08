import { BelongsToGetAssociationMixin, DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import { CommentT } from "../../types/community.js";
import { LessonT, UnitT } from "../../types/learning.js";
import Course from "./course.js";
import User from '../user/index.js'
import CourseUnit from './unit.js'


class Lesson extends Model<LessonT> {
    id?: number
    userId: number
    courseId: string
    unitId: string
    title: string
    videoUrl: string;
    created_at?: Date
    // public getUser!: BelongsToGetAssociationMixin<User>;
}

Lesson.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            }
        },
        courseId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Course',
                key: 'id',
            }
        },
        unitId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Unit',
                key: 'id',
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "Lesson",
        tableName: "Lessons",
        timestamps: false,
        createdAt: 'created_at'
    }
);

export default Lesson;

Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Lesson.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Lesson.belongsTo(CourseUnit, { foreignKey: 'unitId', as: 'unit' });
CourseUnit.hasMany(Lesson, { foreignKey: 'unitId', as: 'lessons' });

// CREATE TABLE lessons (
//         id VARCHAR(255) PRIMARY KEY,
//         userId INT NOT NULL,
//         courseId VARCHAR(255) NOT NULL,
//         unitId VARCHAR(255) NOT NULL,
//         title VARCHAR(50) NOT NULL,
//          videoUrl VARCHAR(255) NOT NULL,
//          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//          FOREIGN KEY (userId) REFERENCES users(id),
//          FOREIGN KEY (courseId) REFERENCES courses(id),
//          FOREIGN KEY (unitId) REFERENCES courseunits(id)
//      );