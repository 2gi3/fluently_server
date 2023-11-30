import express from 'express';
// import auth from '../middleware/auth';
import { signup, login, deleteUser, getAllUsers, updateUser, getOneUser } from '../../controllers/user/index.js';
import auth from '../../middleware/auth.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
// router.delete('/:id', auth as RequestHandler, userCtrl.deleteUser as RequestHandler);
router.delete('/:id', auth, deleteUser);
router.patch('/:id', auth, updateUser);
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getOneUser);
export default router;
//# sourceMappingURL=index.js.map