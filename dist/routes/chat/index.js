import express from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
import { createMessage, getAllChatroomMessages, getLastChatroomMessage, updateMessageStatus } from '../../controllers/chat/message.js';
import auth from '../../middleware/auth.js';
import { highlimiter, lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import { saveAudioFile } from '../../controllers/chat/audioFile.js';
import { audioUploadMiddleware, imagesUploadMiddleware } from '../../middleware/multer-config.js';
import { saveImageFiles } from '../../controllers/chat/imageFiles.js';
// import {audioUploadMiddleware} from '../../middleware/'
const router = express.Router();
router.get('/:id', mediumLimiter, auth, getAllUserChatrooms);
router.post('/', mediumLimiter, auth, createChatroom);
router.post('/message', highlimiter, auth, createMessage);
router.post('/audioFile', mediumLimiter, auth, audioUploadMiddleware, saveAudioFile);
router.post('/imageFile', lowLimiter, auth, imagesUploadMiddleware, saveImageFiles);
router.get('/message/:chatId', highlimiter, auth, getAllChatroomMessages);
router.get('/last_message/:chatId', highlimiter, auth, getLastChatroomMessage);
router.patch('/message/:messageId', highlimiter, auth, updateMessageStatus);
export default router;
//# sourceMappingURL=index.js.map