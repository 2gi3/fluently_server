import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { signup, login, deleteUser, getAllUsers, updateUser, getOneUser } from '../../controllers/user/index.js';
import auth from '../../middleware/auth.js';

const router: Router = express.Router();

router.post('/signup', signup as RequestHandler);
router.post('/login', login as RequestHandler);
router.delete('/:id', auth, deleteUser as RequestHandler);
router.patch('/:id', auth, updateUser as RequestHandler);
router.get('/', auth, getAllUsers as RequestHandler);
router.get('/:id', auth, getOneUser as RequestHandler);



export default router;
