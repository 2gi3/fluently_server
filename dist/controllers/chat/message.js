import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import Message from '../../models/chat/message.js';
import Chatroom from '../../models/chat/index.js';
// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
// const timestamp = new Date().getTime();
export const createMessage = async (req, res, next) => {
    try {
        const { chatId, userId, text, status } = req.body;
        const message = new Message({
            chatId, userId, text, status
        });
        const newMessage = await message.save();
        console.log({ newMessage: newMessage });
        const chatroom = await Chatroom.findOne({
            where: {
                id: chatId,
            }
        });
        console.log({ chatroom: chatroom });
        if (chatroom) {
            await Chatroom.update({ last_message_id: newMessage.id }, {
                where: {
                    id: chatId
                }
            });
        }
        res.status(201).json({
            message: 'New message created successfully!',
            newMessage
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
export const getAllChatroomMessages = async (req, res, next) => {
    const { chatId } = req.params;
    try {
        const chatMessages = await Message.findAll({
            where: {
                chatId: chatId
            }
        });
        res.status(200).json(chatMessages);
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=message.js.map