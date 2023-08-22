import { Sequelize, DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
import { UserT } from "../../types/user.js";

const sequelize = database;

class User extends Model<UserT> {
  public id!: number; // Add the id field
  public email!: string;
  public password!: string;
  public name!: string;
  public nationality!: string;
  public country!: string;
  public native_language!: string;
  public teaching_language!: string;
  public learning_language!: string;
  public device_identifier!: string;
  public age!: number | null; // Add the age field
  public image!: string | null; // Add the image field
  public gender!: string | null; // Add the gender field
  public banned!: boolean | null; // Add the banned field
}

User.init(
  {
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
    device_identifier: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: false,
  }
);

export default User;
