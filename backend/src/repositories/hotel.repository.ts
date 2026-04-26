import prisma from '../config/database';
import { Prisma } from '@prisma/client';

export interface HotelSearchParams {
  city?: string;
  search?: string;
  starRating?: number;
  minPrice?: number;
  maxPrice?: number;
  amenityIds?: number[];
  checkIn?: string;
  checkOut?: string;
  page: number;
  limit: number;
}

export class HotelRepository {
  async search(params: HotelSearchParams) {
    const { city, search, starRating, minPrice, maxPrice, amenityIds, checkIn, checkOut, page, limit } = params;
    const where: Prisma.HotelWhereInput = {};
    const AND: Prisma.HotelWhereInput[] = [];

    if (city) AND.push({ city: { contains: city } });
    if (search) {
      AND.push({
        OR: [
          { name: { contains: search } },
          { city: { contains: search } },
          { address: { contains: search } },
        ],
      });
    }
    if (starRating) AND.push({ starRating });
    if (minPrice || maxPrice) {
      AND.push({
        rooms: {
          some: {
            price: {
              gte: minPrice || 0,
              lte: maxPrice || 999999999,
            },
          },
        },
      });
    }
    if (amenityIds && amenityIds.length > 0) {
      for (const aid of amenityIds) {
        AND.push({ amenities: { some: { amenityId: aid } } });
      }
    }
    if (checkIn && checkOut) {
      AND.push({
        rooms: {
          some: {
            status: 'available',
          },
        },
      });
    }

    if (AND.length > 0) where.AND = AND;

    const [total, hotels] = await Promise.all([
      prisma.hotel.count({ where }),
      prisma.hotel.findMany({
        where,
        include: {
          rooms: { select: { price: true, status: true }, where: { status: 'available' } },
          _count: { select: { reviews: true } },
        },
        orderBy: [{ isFeatured: 'desc' }, { rating: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const mapped = hotels.map((h) => {
      const prices = h.rooms.map((r) => Number(r.price));
      const { rooms, _count, starRating, imageUrl, isFeatured, createdAt, updatedAt, ...rest } = h;
      return {
        ...rest,
        star_rating: starRating,
        image_url: imageUrl,
        is_featured: isFeatured,
        created_at: createdAt,
        updated_at: updatedAt,
        min_price: prices.length > 0 ? Math.min(...prices) : null,
        review_count: _count.reviews,
      };
    });

    return { hotels: mapped, total };
  }

  async findFeatured() {
    const hotels = await prisma.hotel.findMany({
      where: { isFeatured: true },
      include: {
        rooms: { select: { price: true }, where: { status: 'available' } },
        _count: { select: { reviews: true } },
      },
      orderBy: { rating: 'desc' },
      take: 6,
    });

    return hotels.map((h) => {
      const prices = h.rooms.map((r) => Number(r.price));
      const { rooms, _count, starRating, imageUrl, isFeatured, createdAt, updatedAt, ...rest } = h;
      return {
        ...rest,
        star_rating: starRating,
        image_url: imageUrl,
        is_featured: isFeatured,
        created_at: createdAt,
        updated_at: updatedAt,
        min_price: prices.length > 0 ? Math.min(...prices) : null,
        review_count: _count.reviews,
      };
    });
  }

  async findById(id: number) {
    return prisma.hotel.findUnique({
      where: { id },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
        rooms: { orderBy: { price: 'asc' } },
        reviews: {
          include: { user: { select: { name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { reviews: true } },
      },
    });
  }

  async getCities() {
    const result = await prisma.hotel.groupBy({
      by: ['city'],
      _count: { city: true },
      orderBy: { _count: { city: 'desc' } },
    });
    return result.map((r) => ({ city: r.city, hotel_count: r._count.city }));
  }

  async create(data: Prisma.HotelCreateInput) {
    return prisma.hotel.create({ data });
  }

  async update(id: number, data: Prisma.HotelUpdateInput) {
    return prisma.hotel.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.hotel.delete({ where: { id } });
  }

  async updateRating(hotelId: number) {
    const result = await prisma.review.aggregate({
      where: { hotelId },
      _avg: { rating: true },
    });
    await prisma.hotel.update({
      where: { id: hotelId },
      data: { rating: result._avg.rating || 0 },
    });
  }

  async setAmenities(hotelId: number, amenityIds: number[]) {
    await prisma.hotelAmenity.deleteMany({ where: { hotelId } });
    if (amenityIds.length > 0) {
      await prisma.hotelAmenity.createMany({
        data: amenityIds.map((amenityId) => ({ hotelId, amenityId })),
      });
    }
  }

  async count() {
    return prisma.hotel.count();
  }
}

export const hotelRepository = new HotelRepository();
