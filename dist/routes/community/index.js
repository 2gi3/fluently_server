import express from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import { createPost, getAllPosts } from '../../controllers/community/index.js';
import auth from '../../middleware/auth.js';
const router = express.Router();
router.post('/post', lowLimiter, auth, createPost);
router.get('/post', mediumLimiter, auth, getAllPosts);
export default router;
//# sourceMappingURL=index.js.map