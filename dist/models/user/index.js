import { Sequelize, DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
const sequelize = new Sequelize(database);
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
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
    age: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
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
    device_identifier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    banned: {
        type: DataTypes.BOOLEAN,
    },
}, {
    sequelize,
    modelName: "user",
    timestamps: true,
});
export default User;
//# sourceMappingURL=index.js.map