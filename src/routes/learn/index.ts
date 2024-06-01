import express, { Router } from 'express';
import { RequestHandler } from 'express';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
import auth from '../../middleware/auth.js';
import { createCourse, getAllCourses } from '../../controllers/learn/courses.js';

const router: Router = express.Router();

router.get('/courses', mediumLimiter, getAllCourses as RequestHandler);
router.post('/courses', mediumLimiter, auth, createCourse as RequestHandler);

export default router;
