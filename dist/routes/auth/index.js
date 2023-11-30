import express from 'express';
import { createAccessToken } from '../../controllers/auth/index.js';
const router = express.Router();
router.get('/token', createAccessToken);
export default router;
//# sourceMappingURL=index.js.map