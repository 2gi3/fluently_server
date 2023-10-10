import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { getAllUserChatrooms, createChatroom } from '../../controllers/chat/index.js';

const router: Router = express.Router();

router.get('/:id', getAllUserChatrooms as RequestHandler);
router.post('/', createChatroom as RequestHandler);

export default router