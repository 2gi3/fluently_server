import { DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
// const sequelize = new Sequelize(database);
const sequelize = database;
class NewUser extends Model {
}
NewUser.init({
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
    device_identifier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "newUser",
    tableName: "users",
    timestamps: false,
});
export default NewUser;
//# sourceMappingURL=newuser.js.map