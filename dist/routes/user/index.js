import express from 'express';
// import auth from '../middleware/auth';
import { signup, login, deleteUser, getAllUsers, updateUser, getOneUser } from '../../controllers/user/index.js';
import auth from '../../middleware/auth.js';
import { lowLimiter, mediumLimiter } from '../../middleware/rateLimiter.js';
const router = express.Router();
router.post('/signup', lowLimiter, signup);
router.post('/login', lowLimiter, login);
router.delete('/:id', lowLimiter, auth, deleteUser);
router.patch('/:id', mediumLimiter, auth, updateUser);
router.get('/', mediumLimiter, auth, getAllUsers);
router.get('/:id', mediumLimiter, auth, getOneUser);
export default router;
//# sourceMappingURL=index.js.map