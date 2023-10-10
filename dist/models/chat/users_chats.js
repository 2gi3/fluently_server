import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import User from '../user/index.js';
import Chatroom from './index.js';
class UsersChats extends Model {
}
UsersChats.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize,
    modelName: "UsersChats",
    tableName: "users_chats",
    timestamps: false,
});
export default UsersChats;
UsersChats.belongsTo(User, { foreignKey: "user_id" });
UsersChats.belongsTo(Chatroom, { foreignKey: "chat_id" });
User.belongsToMany(Chatroom, { through: UsersChats, foreignKey: "user_id" });
Chatroom.belongsToMany(User, { through: UsersChats, foreignKey: "chat_id" });
//# sourceMappingURL=users_chats.js.map