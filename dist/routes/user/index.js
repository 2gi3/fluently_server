import express from 'express';
// import auth from '../middleware/auth';
import { signup, login } from '../../controllers/user/index.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
// router.delete('/:id', auth as RequestHandler, userCtrl.deleteUser as RequestHandler);
export default router;
//# sourceMappingURL=index.js.map