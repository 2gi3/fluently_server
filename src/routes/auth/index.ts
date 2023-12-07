import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { createAccessToken, deleteRefreshToken } from '../../controllers/auth/index.js';
import { lowLimiter } from '../../middleware/rateLimiter.js';
import auth from '../../middleware/auth.js';

const router: Router = express.Router();

router.get('/token/:token', auth, lowLimiter, createAccessToken as RequestHandler);
router.delete('/token/:token', auth, lowLimiter, deleteRefreshToken as RequestHandler);

export default router