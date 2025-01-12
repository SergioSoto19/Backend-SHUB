import express from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';
import {getHotels,registerHotel,updateHotel,deleteHotel} from '../controllers/hotelController.js';


const router = express.Router();

router.get('/hotels', verifyToken,getHotels);
router.post('/hotels',verifyToken, verifyAdmin, registerHotel);
router.put('/hotels/:id',verifyToken, verifyAdmin, updateHotel);
router.delete('/hotels/:id',verifyToken, verifyAdmin, deleteHotel);

export default router;

