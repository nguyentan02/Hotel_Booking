import prisma from '../config/database';

export class ReviewRepository {
  async findByUserAndHotel(userId: number, hotelId: number) {
    return prisma.review.findFirst({ where: { userId, hotelId } });
  }

  async create(data: { userId: number; hotelId: number; rating: number; comment?: string }) {
    return prisma.review.create({ data });
  }

  async findByHotel(hotelId: number) {
    return prisma.review.findMany({
      where: { hotelId },
      include: { user: { select: { name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number) {
    return prisma.review.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return prisma.review.delete({ where: { id } });
  }
}

export const reviewRepository = new ReviewRepository();
