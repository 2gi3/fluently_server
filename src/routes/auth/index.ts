import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { createAccessToken, deleteRefreshToken } from '../../controllers/auth/index.js';

const router: Router = express.Router();

router.get('/token', createAccessToken as RequestHandler);
router.delete('/token', deleteRefreshToken as RequestHandler);

export default router