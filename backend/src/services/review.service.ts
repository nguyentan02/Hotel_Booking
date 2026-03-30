import { reviewRepository } from '../repositories/review.repository';
import { hotelRepository } from '../repositories/hotel.repository';
import { AppError } from '../utils/appError';
import { CreateReviewInput } from '../dto/review.dto';

export class ReviewService {
  async create(input: CreateReviewInput, userId: number) {
    const existing = await reviewRepository.findByUserAndHotel(userId, input.hotel_id);
    if (existing) throw new AppError('Bạn đã đánh giá khách sạn này rồi', 400);

    await reviewRepository.create({
      userId,
      hotelId: input.hotel_id,
      rating: input.rating,
      comment: input.comment,
    });

    await hotelRepository.updateRating(input.hotel_id);
  }

  async getByHotel(hotelId: number) {
    const reviews = await reviewRepository.findByHotel(hotelId);
    return reviews.map((r) => ({
      ...r,
      user_name: r.user.name,
      avatar_url: r.user.avatarUrl,
    }));
  }

  async delete(id: number, userId: number, role: string) {
    const review = await reviewRepository.findById(id);
    if (!review) throw new AppError('Không tìm thấy đánh giá', 404);
    if (role !== 'admin' && review.userId !== userId) throw new AppError('Không có quyền', 403);

    const hotelId = review.hotelId;
    await reviewRepository.delete(id);
    await hotelRepository.updateRating(hotelId);
  }
}

export const reviewService = new ReviewService();
