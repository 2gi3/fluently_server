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
        const { chatId, userId, text, status, type, audioUrl, audioDuration, imageUrl } = req.body;
        console.log({ chatId, userId, text, status, type, audioUrl, audioDuration, imageUrl });
        const message = new Message({
            chatId, userId, text, status, type, audioUrl, audioDuration, imageUrl
        });
        const newMessage = await message.save();
        const chatroom = await Chatroom.findOne({
            where: {
                id: chatId,
            }
        });
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
export const getLastChatroomMessage = async (req, res, next) => {
    const { chatId } = req.params;
    try {
        const lastChatMessage = await Message.findOne({
            where: {
                chatId: chatId
            },
            order: [['created_at', 'DESC']]
        });
        if (lastChatMessage) {
            res.status(200).json(lastChatMessage);
        }
        else {
            res.status(200).json({
                "id": 99999999999999,
                "chatId": chatId,
                "userId": 0,
                "text": "This chat has been opened but no message has been sent yet",
                "status": "read",
                "created_at": null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
export const updateMessageStatus = async (req, res, next) => {
    const { messageId } = req.params;
    const { status } = req.body;
    try {
        const message = await Message.findByPk(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        message.status = status;
        await message.save();
        res.status(200).json({
            updatedMessage: message,
            message: 'Message status updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=message.js.map