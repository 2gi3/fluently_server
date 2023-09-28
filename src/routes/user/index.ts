import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { signup, login, deleteUser, getAllUsers, updateUser } from '../../controllers/user/index.js';

const router: Router = express.Router();

router.post('/signup', signup as RequestHandler);
router.post('/login', login as RequestHandler);
// router.delete('/:id', auth as RequestHandler, userCtrl.deleteUser as RequestHandler);
router.delete('/:id', deleteUser as RequestHandler);
router.patch('/:id', updateUser as RequestHandler);
router.get('/', getAllUsers as RequestHandler);



export default router;
