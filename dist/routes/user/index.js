import express from 'express';
// import auth from '../middleware/auth';
import { signup, login, deleteUser, getAllUsers, updateUser } from '../../controllers/user/index.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
// router.delete('/:id', auth as RequestHandler, userCtrl.deleteUser as RequestHandler);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.get('/', getAllUsers);
export default router;
//# sourceMappingURL=index.js.map