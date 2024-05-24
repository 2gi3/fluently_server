import express from 'express';
import { mediumLimiter } from '../../middleware/rateLimiter.js';
import { getAllCourses } from '../../controllers/learn/courses.js';
const router = express.Router();
router.get('/courses', mediumLimiter, getAllCourses);
export default router;
//# sourceMappingURL=index.js.map