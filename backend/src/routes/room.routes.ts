import { Router } from 'express';
import { roomController } from '../controllers/room.controller';

const router = Router();

router.get('/hotel/:hotelId', (req, res, next) => roomController.getRoomsByHotel(req, res, next));
router.get('/availability', (req, res, next) => roomController.checkAvailability(req, res, next));
router.get('/:id', (req, res, next) => roomController.getRoomById(req, res, next));

export default router;
