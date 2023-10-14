import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
import { createMessage, getAllChatroomMessages } from '../../controllers/chat/message.js';

const router: Router = express.Router();

router.get('/:id', getAllUserChatrooms as RequestHandler);
router.post('/', createChatroom as RequestHandler);
router.post('/message', createMessage as RequestHandler);
router.get('/message/:chatId', getAllChatroomMessages as RequestHandler);


export default router