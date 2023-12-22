import { Sequelize, DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
import { NewUserT } from "../../types/user.js";

// const sequelize = new Sequelize(database);
const sequelize = database;

class NewUser extends Model<NewUserT> {
    public email!: string;
    public password!: string;
    public name!: string;
    public nationality!: string;
    public country?: string;
    public native_language!: string;
    public teaching_language!: string;
    public learning_language!: string;
}

NewUser.init(
    {
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
            allowNull: true,
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
        }
    },
    {
        sequelize,
        modelName: "newUser",
        tableName: "users",
        timestamps: false,
    }
);

export default NewUser;
