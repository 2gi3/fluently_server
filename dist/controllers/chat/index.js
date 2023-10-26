import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import Chatroom from '../../models/chat/index.js';
import UsersChats from '../../models/chat/users_chats.js';
import { Op } from 'sequelize';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const timestamp = new Date().getTime();
export const createChatroom = async (req, res, next) => {
    try {
        const { user1Id, user2Id } = req.body;
        const existingChatroom = await Chatroom.findOne({
            where: {
                [Op.or]: [
                    {
                        user1Id: user1Id,
                        user2Id: user2Id,
                    },
                    {
                        user1Id: user2Id,
                        user2Id: user1Id,
                    }
                ]
            }
        });
        if (existingChatroom) {
            res.status(200).json({
                message: 'Chatroom already exists',
                chatroom: existingChatroom
            });
        }
        else {
            const chatRoom = new Chatroom({
                user1Id, user2Id,
                //  id: `${user1Id}-${user2Id}-${timestamp}` 
            });
            const newChatroom = await chatRoom.save();
            await UsersChats.create({ user_id: user1Id, chat_id: newChatroom.id });
            await UsersChats.create({ user_id: user2Id, chat_id: newChatroom.id });
            res.status(201).json({
                message: 'New chat created successfully!',
                newChatroom
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
export const getAllUserChatrooms = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userChats = await UsersChats.findAll({
            where: {
                user_id: userId
            }
        });
        const chatIds = userChats.map((userChat) => userChat.chat_id);
        const chatrooms = await Chatroom.findAll({
            where: {
                id: chatIds
            }
        });
        res.status(200).json(chatrooms);
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=index.js.map