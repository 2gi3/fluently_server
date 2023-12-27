import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import { createPost, createSavedPost, deleteSavedPost, getAllPosts, getOnePost } from '../../controllers/community/index.js';
import auth from '../../middleware/auth.js';
import { createPostComment } from '../../controllers/community/postComment.js';

const router: Router = express.Router();

router.post('/post', lowLimiter, auth, createPost as RequestHandler);
router.post('/postcomment', mediumLimiter, auth, createPostComment as RequestHandler);
router.post('/savedposts', mediumLimiter, createSavedPost as RequestHandler);
router.get('/post', mediumLimiter, auth, getAllPosts as RequestHandler);
router.get('/post/:id', mediumLimiter, auth, getOnePost as RequestHandler);
router.delete('/savedposts/:userId/:postId', mediumLimiter, auth, deleteSavedPost as RequestHandler);




export default router;
