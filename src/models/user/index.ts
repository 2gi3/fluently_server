import { Sequelize, DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
import { Gender, UserT } from "../../types/user.js";
import SavedPost from "../community/savedPosts.js";

const sequelize = database;

class User extends Model<UserT> {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public nationality!: string;
  public country!: string;
  public native_language!: string;
  public teaching_language!: string;
  public learning_language!: string;
  public description!: string;
  public age!: number | null;
  public image!: string | null;
  public gender!: Gender | null;
  public banned!: boolean | null;
  public status!: string | null;

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
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: false,
  }
);

export default User;
