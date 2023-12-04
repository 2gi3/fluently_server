import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { createAccessToken, deleteRefreshToken } from '../../controllers/auth/index.js';
import { lowLimiter } from '../../middleware/rateLimiter.js';

const router: Router = express.Router();

router.get('/token', lowLimiter, createAccessToken as RequestHandler);
router.delete('/token', lowLimiter, deleteRefreshToken as RequestHandler);

export default router