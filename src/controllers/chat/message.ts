import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { Op } from 'sequelize';
import Message from '../../models/chat/message.js';
import Chatroom from '../../models/chat/index.js';
import { MessageT } from '../../types/chat.js';
import { WebSocketServer, WebSocket } from 'ws'
import MessageImage from '../../models/chat/message_images.js';


// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });
// const timestamp = new Date().getTime();

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chatId, userId, text, status, type, audioUrl, audioDuration, imageUrls } = req.body;

        console.log({ chatId, userId, text, status, type, audioUrl, audioDuration, imageUrls })

        const message = new Message({
            chatId, userId, text, status, type, audioUrl, audioDuration,
        });

        const newMessage = await message.save();
        if (imageUrls) {
            imageUrls.map((imageUrl, i) => {
                console.log(`imageUrl${i}: ${imageUrl}`)
                MessageImage.create({
                    message_id: newMessage.id,
                    imageUrl: imageUrl
                });

            })
        }

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
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const getAllChatroomMessages = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;

    try {
        const chatMessages = await Message.findAll({
            where: { chatId: chatId },
            include: [
                {
                    model: MessageImage,
                    as: 'imageUrls',
                    attributes: ['imageUrl'],
                }
            ]
        });

        const transformedChatMessages = chatMessages.map(message => ({
            ...message.toJSON(),
            imageUrls: (message as any).imageUrls.map(image => image.imageUrl)
        }));

        res.status(200).json(transformedChatMessages);


        // res.status(200).json(chatMessages);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export const getLastChatroomMessage = async (req: Request, res: Response, next: NextFunction) => {
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
        } else {
            res.status(200).json({
                "id": 99999999999999,
                "chatId": chatId,
                "userId": 0,
                "text": "This chat has been opened but no message has been sent yet",
                "status": "read",
                "created_at": null
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export const updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}