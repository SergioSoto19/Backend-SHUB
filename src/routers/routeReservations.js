import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getUserReservations,registerReservation,updateReservation, deleteReservation} from '../controllers/reservationController.js';

const router = express.Router();


router.get('/reservations', verifyToken, getUserReservations);
router.post('/reservations', verifyToken, registerReservation);
router.put('/reservations/:id', verifyToken, updateReservation); 
router.delete('/reservations/:id', verifyToken, deleteReservation); 

export default router;