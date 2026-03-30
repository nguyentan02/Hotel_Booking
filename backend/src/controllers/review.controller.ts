import { Response, NextFunction } from 'express';
import { reviewService } from '../services/review.service';
import { AuthRequest } from '../types';

export class ReviewController {
  async createReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await reviewService.create(req.body, req.user!.id);
      res.status(201).json({ message: 'Đánh giá thành công' });
    } catch (err) { next(err); }
  }

  async getReviewsByHotel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const reviews = await reviewService.getByHotel(parseInt(req.params.hotelId as string));
      res.json(reviews);
    } catch (err) { next(err); }
  }

  async deleteReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await reviewService.delete(parseInt(req.params.id as string), req.user!.id, req.user!.role);
      res.json({ message: 'Xóa đánh giá thành công' });
    } catch (err) { next(err); }
  }
}

export const reviewController = new ReviewController();
