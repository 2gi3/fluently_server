import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
import { createMessage, getAllChatroomMessages, getLastChatroomMessage, updateMessageStatus } from '../../controllers/chat/message.js';
import auth from '../../middleware/auth.js';

const router: Router = express.Router();

router.get('/:id', auth, getAllUserChatrooms as RequestHandler);
router.post('/', auth, createChatroom as RequestHandler);
router.post('/message', auth, createMessage as RequestHandler);
router.get('/message/:chatId', auth, getAllChatroomMessages as RequestHandler);
router.get('/last_message/:chatId', auth, getLastChatroomMessage as RequestHandler);
router.patch('/message/:messageId', auth, updateMessageStatus as RequestHandler)


export default router