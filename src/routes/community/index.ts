import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import { createPost, getAllPosts, getOnePost } from '../../controllers/community/index.js';
import auth from '../../middleware/auth.js';
import { createPostComment } from '../../controllers/community/postComment.js';

const router: Router = express.Router();

router.post('/post', lowLimiter, auth, createPost as RequestHandler);
router.post('/postcomment', mediumLimiter, createPostComment as RequestHandler);
router.get('/post', mediumLimiter, auth, getAllPosts as RequestHandler);
router.get('/post/:id', mediumLimiter, auth, getOnePost as RequestHandler);



export default router;
