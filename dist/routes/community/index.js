import express from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import { createPost, createSavedPost, deleteSavedPost, getAllPosts, getOnePost, getSavedPosts } from '../../controllers/community/index.js';
import auth from '../../middleware/auth.js';
import { createPostComment } from '../../controllers/community/postComment.js';
const router = express.Router();
router.post('/post', lowLimiter, auth, createPost);
router.post('/postcomment', mediumLimiter, auth, createPostComment);
router.post('/savedposts', mediumLimiter, auth, createSavedPost);
router.get('/post', mediumLimiter, auth, getAllPosts);
router.get('/post/:id', mediumLimiter, auth, getOnePost);
router.get('/savedposts/:userId', mediumLimiter, auth, getSavedPosts);
router.delete('/savedposts/:userId/:postId', mediumLimiter, auth, deleteSavedPost);
export default router;
//# sourceMappingURL=index.js.map