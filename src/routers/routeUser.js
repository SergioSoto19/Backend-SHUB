import express from 'express';
import { verifyToken} from '../middlewares/authMiddleware.js';
import {getUsers,registerUser} from '../controllers/userController.js';

const router = express.Router();
router.get('/users', verifyToken, getUsers);
router.post('/register', registerUser);

export default router;