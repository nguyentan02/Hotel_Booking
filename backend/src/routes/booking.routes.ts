import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { authenticate, optionalAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', optionalAuth, (req, res, next) => bookingController.createBooking(req, res, next));
router.get('/my', authenticate, (req, res, next) => bookingController.getMyBookings(req, res, next));
router.get('/:id', authenticate, (req, res, next) => bookingController.getBookingById(req, res, next));
router.put('/:id', authenticate, (req, res, next) => bookingController.updateBooking(req, res, next));
router.put('/:id/cancel', authenticate, (req, res, next) => bookingController.cancelBooking(req, res, next));

export default router;
