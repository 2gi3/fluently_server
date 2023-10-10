import express from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';
const router = express.Router();
router.get('/:id', getAllUserChatrooms);
router.post('/', createChatroom);
export default router;
//# sourceMappingURL=index.js.map