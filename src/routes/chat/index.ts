import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
import { createMessage, getAllChatroomMessages, getLastChatroomMessage, updateMessageStatus } from '../../controllers/chat/message.js';
import auth from '../../middleware/auth.js';
import { highlimiter, mediumLimiter } from '../../middleware/rateLimiter.js';

const router: Router = express.Router();

router.get('/:id', mediumLimiter, auth, getAllUserChatrooms as RequestHandler);
router.post('/', mediumLimiter, auth, createChatroom as RequestHandler);
router.post('/message', highlimiter, auth, createMessage as RequestHandler);
router.get('/message/:chatId', highlimiter, auth, getAllChatroomMessages as RequestHandler);
router.get('/last_message/:chatId', highlimiter, auth, getLastChatroomMessage as RequestHandler);
router.patch('/message/:messageId', highlimiter, auth, updateMessageStatus as RequestHandler)


export default router