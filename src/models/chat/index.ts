import { DataTypes, Model } from "sequelize";
import database from '../../../config/db.config.mjs';
import { ChatroomT } from "../../types/chat.js";

const sequelize = database;

class Chatroom extends Model<ChatroomT> {
  public id?: number;
  public userId!: number;
  public chatroomId!: number;
  public last_message_id?: number;
}

Chatroom.init(
  {
    // id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    //user1Id is the user that starts the chat
    user1Id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_message_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Chatroom",
    tableName: "chatrooms",
    timestamps: false,
  }
);

export default Chatroom;
