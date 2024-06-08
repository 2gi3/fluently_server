import express from 'express';
import { mediumLimiter } from '../../middleware/rateLimiter.js';
import auth from '../../middleware/auth.js';
import { createCourse, createLesson, createUnit, getAllCourses } from '../../controllers/learn/courses.js';
const router = express.Router();
router.get('/courses', mediumLimiter, getAllCourses);
router.post('/courses', mediumLimiter, auth, createCourse);
router.post('/courses/unit', mediumLimiter, auth, createUnit);
router.post('/courses/unit/lesson', mediumLimiter, auth, createLesson);
export default router;
//# sourceMappingURL=index.js.map