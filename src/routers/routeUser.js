import express from 'express';
import {getUsers,registerUser} from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/users', verifyToken, verifyAdmin, getUsers);
router.post('/register', registerUser);

export default router;