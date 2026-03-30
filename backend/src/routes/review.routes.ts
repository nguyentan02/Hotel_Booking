import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createReviewSchema } from '../dto/review.dto';

const router = Router();

router.get('/hotel/:hotelId', (req, res, next) => reviewController.getReviewsByHotel(req, res, next));
router.post('/', authenticate, validate(createReviewSchema), (req, res, next) => reviewController.createReview(req, res, next));
router.delete('/:id', authenticate, (req, res, next) => reviewController.deleteReview(req, res, next));

export default router;
