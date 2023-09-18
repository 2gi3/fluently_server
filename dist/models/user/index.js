import { DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
const sequelize = database;
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    native_language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teaching_language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    learning_language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    banned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: false,
});
export default User;
//# sourceMappingURL=index.js.map