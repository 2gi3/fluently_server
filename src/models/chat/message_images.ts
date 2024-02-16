import { DataTypes, Model } from "sequelize";
import sequelize from '../../../config/db.config.mjs';
import Message from './index.js';

class MessageImage extends Model {
    public id?: number;
    public message_id: number | string;
    public imageUrl: string;
}

MessageImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "MessageImage",
        tableName: "message_images",
        timestamps: false,
    }
);

export default MessageImage;

MessageImage.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });
