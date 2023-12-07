import express from 'express';
import { createAccessToken, deleteRefreshToken } from '../../controllers/auth/index.js';
import { lowLimiter } from '../../middleware/rateLimiter.js';
import auth from '../../middleware/auth.js';
const router = express.Router();
router.get('/token/:token', auth, lowLimiter, createAccessToken);
router.delete('/token/:token', auth, lowLimiter, deleteRefreshToken);
export default router;
//# sourceMappingURL=index.js.map