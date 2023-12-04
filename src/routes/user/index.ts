import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { signup, login, deleteUser, getAllUsers, updateUser, getOneUser } from '../../controllers/user/index.js';
import auth from '../../middleware/auth.js';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';

const router: Router = express.Router();

router.post('/signup', lowLimiter, signup as RequestHandler);
router.post('/login', lowLimiter, login as RequestHandler);
router.delete('/:id', lowLimiter, auth, deleteUser as RequestHandler);
router.patch('/:id', mediumLimiter, auth, updateUser as RequestHandler);
router.get('/', mediumLimiter, auth, getAllUsers as RequestHandler);
router.get('/:id', mediumLimiter, auth, getOneUser as RequestHandler);



export default router;
