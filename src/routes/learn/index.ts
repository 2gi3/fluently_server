import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import auth from '../../middleware/auth.js';
import { getAllCourses } from '../../controllers/learn/index.js';

const router: Router = express.Router();

router.get('/courses', mediumLimiter, getAllCourses as RequestHandler);

export default router;
