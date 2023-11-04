import express from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
import { createMessage, getAllChatroomMessages, getLastChatroomMessage, updateMessageStatus } from '../../controllers/chat/message.js';
const router = express.Router();
router.get('/:id', getAllUserChatrooms);
router.post('/', createChatroom);
router.post('/message', createMessage);
router.get('/message/:chatId', getAllChatroomMessages);
router.get('/last_message/:chatId', getLastChatroomMessage);
router.patch('/message/:messageId', updateMessageStatus);
export default router;
//# sourceMappingURL=index.js.map