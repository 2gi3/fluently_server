import { Sequelize, DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
import { UserT } from "../../types/user.js";

const sequelize = new Sequelize(database);

class User extends Model<UserT>  {
  public id: number;
  public email!: string;
  public password: string;
  public name!: string;
  public age!: number | null;
  public image!: string | null;
  public gender!: string | null;
  public nationality!: string;
  public country!: string;
  public native_language!: string;
  public teaching_language!: string;
  public learning_language!: string;
  public device_identifier!: string;
  public banned!: boolean | null;
}

User.init(
  {
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
  },
  {
    sequelize,
    modelName: "user", // Set your model name here
    timestamps: true,
  }
);

export default User;
