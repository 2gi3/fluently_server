import express from 'express';
import { createAccessToken, deleteRefreshToken } from '../../controllers/auth/index.js';
const router = express.Router();
router.get('/token', createAccessToken);
router.delete('/token', deleteRefreshToken);
export default router;
//# sourceMappingURL=index.js.map