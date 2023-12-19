import express from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import { createPost, getAllPosts, getOnePost } from '../../controllers/community/index.js';
import auth from '../../middleware/auth.js';
const router = express.Router();
router.post('/post', lowLimiter, auth, createPost);
router.get('/post', mediumLimiter, auth, getAllPosts);
router.get('/post/:id', mediumLimiter, auth, getOnePost);
export default router;
//# sourceMappingURL=index.js.map