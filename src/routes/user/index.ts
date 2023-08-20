import express, { Router } from 'express';
import { RequestHandler } from 'express';
// import auth from '../middleware/auth';
import { signup } from '../../controllers/user/index.js';

const router: Router = express.Router();

router.post('/signup', signup as RequestHandler);
// router.post('/login', userCtrl.login as RequestHandler);
// router.delete('/:id', auth as RequestHandler, userCtrl.deleteUser as RequestHandler);

export default router;
