import express from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
import { createMessage, getAllChatroomMessages, getLastChatroomMessage, updateMessageStatus } from '../../controllers/chat/message.js';
import auth from '../../middleware/auth.js';
const router = express.Router();
router.get('/:id', auth, getAllUserChatrooms);
router.post('/', auth, createChatroom);
router.post('/message', auth, createMessage);
router.get('/message/:chatId', auth, getAllChatroomMessages);
router.get('/last_message/:chatId', auth, getLastChatroomMessage);
router.patch('/message/:messageId', auth, updateMessageStatus);
export default router;
//# sourceMappingURL=index.js.map