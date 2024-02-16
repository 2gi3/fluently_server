import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import Chatroom from './index.js';
import MessageImage from "./message_images.js";
class Message extends Model {
}
Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
    },
    audioUrl: {
        type: DataTypes.STRING,
    },
    audioDuration: {
        type: DataTypes.NUMBER
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: false,
    createdAt: 'created_at'
});
export default Message;
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Message.belongsTo(Chatroom, { foreignKey: 'chatId', as: 'chat' });
Message.hasMany(MessageImage, { foreignKey: 'message_id', as: 'imageUrls' });
// if you have a message object, you can retrieve the associated user and chatroom as follows:
// const message = ... fetch or create a message ...
// Get the associated user and chatroom for the message
// const user = await message.getUser();
// const chatroom = await message.getChat();
//# sourceMappingURL=message.js.map