import express from 'express';
import { createAccessToken, deleteRefreshToken } from '../../controllers/auth/index.js';
import { lowLimiter } from '../../middleware/rateLimiter.js';
const router = express.Router();
router.get('/token', lowLimiter, createAccessToken);
router.delete('/token', lowLimiter, deleteRefreshToken);
export default router;
//# sourceMappingURL=index.js.map