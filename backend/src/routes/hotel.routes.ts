import { Router } from 'express';
import { hotelController } from '../controllers/hotel.controller';

const router = Router();

router.get('/', (req, res, next) => hotelController.getHotels(req, res, next));
router.get('/featured', (req, res, next) => hotelController.getFeaturedHotels(req, res, next));
router.get('/cities', (req, res, next) => hotelController.getCities(req, res, next));
router.get('/amenities', (req, res, next) => hotelController.getAmenities(req, res, next));
router.get('/:id', (req, res, next) => hotelController.getHotelById(req, res, next));

export default router;
